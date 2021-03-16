import * as React from "react";
import {
  Text,
  Box,
  Calendar as GrommetCalendar,
  Image,
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

export type Props = {
  refDate: Temporal.PlainDate;
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

export const Calendar: React.FC<Props> = ({ refDate }) => {
  const [
    selectedDay,
    setSelectedDay,
  ] = React.useState<Temporal.PlainDate | null>(null);
  const theme = React.useContext(ThemeContext);
  const brandColor = normalizeColor("brand", theme);
  const darkColor = normalizeColor("dark-1", theme);

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
        reference={`${refDate}`}
        daysOfWeek
        firstDayOfWeek={1}
      >
        {({ date, day }) => {
          const currentDate = Temporal.PlainDate.from({
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          });
          const disabled =
            currentDate.until(refDate).total({ unit: "days" }) >= 1;

          const isSelectedWeek =
            selectedDay?.weekOfYear === currentDate.weekOfYear;
          const isCurrentWeek = refDate?.weekOfYear === currentDate.weekOfYear;

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
                    <Image fit="cover" a11yTitle="scuba diving" />
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
