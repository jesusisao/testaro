import { useState } from "react";
import { NextPage } from "next";
import moment from "moment-timezone";
import MetaHeader from "src/components/Common/MetaHeader";
import commonStyle from "styles/common.module.scss";
import style from "./index.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const TimezoneConverter: NextPage = () => {
  const now = moment();

  const [year, setYear] = useState(now.year());
  const [month, setMonth] = useState(now.month() + 1); // momentは0から始まるため
  const [day, setDay] = useState(now.date());
  const [hour, setHour] = useState(now.hour());
  const [minute, setMinute] = useState(now.minute());

  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("Asia/Tokyo");

  const timezones = [
    "UTC",
    "Asia/Tokyo",
    "America/New_York",
    "Europe/London",
    "Australia/Sydney",
    "America/Los_Angeles",
    "Europe/Paris",
    "Asia/Shanghai",
    "Asia/Dubai",
    "America/Chicago",
  ];

  const inputTime = () => {
    return moment.tz(
      {
        year: year,
        month: month - 1, // momentは0から始まるため調整
        date: day,
        hour: hour,
        minute: minute,
      },
      fromTimezone
    );
  };
  const convertedTime = () => {
    return inputTime().tz(toTimezone);
  };

  const swapTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  const setCurrentTime = () => {
    const now = moment();
    setYear(now.year());
    setMonth(now.month() + 1);
    setDay(now.date());
    setHour(now.hour());
    setMinute(now.minute());
  };

  const title = "タイムゾーン変換";
  const description = "タイムゾーンで日時を変換できます。";

  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/timezone-converter"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>

      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <div className={style.dateTimeInputContainer}>
            <ParamBox labelName="年" labelWidth="20px">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className={style.timeInput}
              />
            </ParamBox>

            <ParamBox labelName="月" labelWidth="20px">
              <input
                type="number"
                value={month}
                min="1"
                max="12"
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className={style.timeInput}
              />
            </ParamBox>

            <ParamBox labelName="日" labelWidth="20px">
              <input
                type="number"
                value={day}
                min="1"
                max="31"
                onChange={(e) => setDay(parseInt(e.target.value))}
                className={style.timeInput}
              />
            </ParamBox>

            <ParamBox labelName="時" labelWidth="20px">
              <input
                type="number"
                value={hour}
                min="0"
                max="23"
                onChange={(e) => setHour(parseInt(e.target.value))}
                className={style.timeInput}
              />
            </ParamBox>

            <ParamBox labelName="分" labelWidth="20px">
              <input
                type="number"
                value={minute}
                min="0"
                max="59"
                onChange={(e) => setMinute(parseInt(e.target.value))}
                className={style.timeInput}
              />
            </ParamBox>
          </div>

          <div className={style.timezoneContainer}>
            <ParamBox labelName="元のTZ">
              <select
                value={fromTimezone}
                onChange={(e) => setFromTimezone(e.target.value)}
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </ParamBox>

            <button
              onClick={swapTimezones}
              className={commonStyle.testaroInlineButton}
              style={{ width: "80px" }}
              title="タイムゾーンを入れ替える"
            >
              <FontAwesomeIcon
                icon={faExchangeAlt}
                className={commonStyle.icon}
              />
            </button>

            <ParamBox labelName="変換先TZ">
              <select
                value={toTimezone}
                onChange={(e) => setToTimezone(e.target.value)}
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </ParamBox>
          </div>

          <div className={style.buttonContainer}>
            <button
              className={commonStyle.testaroButton}
              onClick={setCurrentTime}
            >
              現在時刻代入
              <FontAwesomeIcon icon={faClock} className={commonStyle.icon} />
            </button>
          </div>
        </div>
      </div>

      <div className={commonStyle.outputsContainer}>
        <div className={commonStyle.outputContainer}>
          <p className={commonStyle.outputLabel}>入力</p>
          <div className={style.timeDisplay}>
            <p>{inputTime().format("YYYY-MM-DD HH:mm:ss z")}</p>
          </div>
          <br />
          <p className={commonStyle.outputLabel}>変換後</p>
          <div className={style.timeDisplay}>
            <p>{convertedTime().format("YYYY-MM-DD HH:mm:ss z")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimezoneConverter;
