import * as React from "react";
import {
  Text,
  Box,
  Calendar as GrommetCalendar,
  Stack,
  Main,
  Card,
  CardBody,
  CardHeader,
  ThemeContext,
  Button,
} from "grommet";
import { Temporal } from "proposal-temporal";
import { normalizeColor } from "grommet/utils";
import styled from "styled-components";
import { usePlan } from "../../hooks/usePlan";

export type Props = {
  refDate: Temporal.ZonedDateTime;
};

const getDayColor = ({
  isSelectedWeek,
  isCurrentWeek,
  brandColor,
}: {
  isSelectedWeek: boolean;
  isCurrentWeek: boolean;
  brandColor: string;
}) => {
  if (isSelectedWeek) return `${brandColor}77`;
  if (isCurrentWeek) return `${brandColor}33`;
  return "white";
};

const DisableBox = styled(Box)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? "0.35" : "")};
`;

export const Calendar: React.FC<Props> = ({ refDate: referenceProp }) => {
  const theme = React.useContext(ThemeContext);
  const brandColor = normalizeColor("brand", theme);
  const darkColor = normalizeColor("dark-1", theme);

  const [reference, setReference] = React.useState<Temporal.ZonedDateTime>(
    referenceProp
  );
  const [
    selectedDay,
    setSelectedDay,
  ] = React.useState<Temporal.PlainDateTime | null>(null);

  React.useEffect(() => {
    setReference(referenceProp);
  }, [referenceProp]);

  const { data, status, error } = usePlan({
    daterange: {
      from: `${reference.subtract({ months: 1 }).toInstant()}`,
      to: `${reference.add({ months: 2 }).toInstant()}`,
    },
  });

  if (status === "error") return <>Error fetching plans: {`${error}`}</>;

  return (
    <Main pad="large">
      <Button
        disabled={!selectedDay}
        href={`plan/${selectedDay?.year}/${selectedDay?.weekOfYear}`}
        primary
        label="Plan this week"
      />
      <GrommetCalendar
        fill
        reference={`${reference.toInstant()}`}
        daysOfWeek
        firstDayOfWeek={1}
        onReference={(date) => {
          const newReference = Temporal.PlainDateTime.from(
            date
          ).toZonedDateTime("Etc/UTC");
          setReference(newReference.subtract({ days: newReference.day - 1 }));
        }}
      >
        {({ date, day }) => {
          const currentDate = Temporal.PlainDateTime.from({
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          });
          const disabled =
            currentDate.until(referenceProp).total({ unit: "days" }) >= 1;

          const isSelectedWeek =
            selectedDay?.weekOfYear === currentDate.weekOfYear;
          const isCurrentWeek =
            referenceProp?.weekOfYear === currentDate.weekOfYear;

          const plan = data.find((currentPlan) =>
            currentDate.equals(currentPlan.date)
          );

          return (
            <DisableBox key={date} pad="xsmall" disabled={disabled}>
              <Card
                width="medium"
                background={getDayColor({
                  isSelectedWeek,
                  isCurrentWeek,
                  brandColor,
                })}
                fill
                onClick={() =>
                  isSelectedWeek
                    ? setSelectedDay(null)
                    : setSelectedDay(currentDate)
                }
              >
                <Stack anchor="top-right">
                  <CardBody height="small">
                    <br />
                    <br />
                    <br />
                    {status === "loading" ? "loading..." : plan?.recipe.name}
                  </CardBody>
                  <CardHeader
                    pad={{ horizontal: "small" }}
                    background={`${darkColor}55`}
                    width="medium"
                    justify="start"
                  >
                    <Box pad="xsmall" align="end" justify="end" fill>
                      <Text size="large">Day: {day}</Text>
                    </Box>
                  </CardHeader>
                </Stack>
              </Card>
            </DisableBox>
          );
        }}
      </GrommetCalendar>
    </Main>
  );
};
