import React, { useState, useEffect } from "react";
import commonStyle from "styles/common.module.scss";
import style from "./UserGenerator.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { downloadAsCsv } from "src/models/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faRedo } from "@fortawesome/free-solid-svg-icons";
import {
  createUsers,
  userToCsvText,
  sortedUserKeys,
  userDisplayInfo,
  DisplayUserKey,
} from "src/models/user/user";
import UserTable, {
  headerLabels,
} from "src/components/UserGenerator/UserTable";

const UserGenerator: React.FC = () => {
  const [genNum, setGenNum] = useState(20);
  const [useNumro, setUseNumro] = useState(false);
  const [mailDomain, setMailDomain] = useState("testaro.netlify.app");
  const [idOffset, setIdOffset] = useState(0);
  const [nameSeparator, setNameSeparator] = useState(" ");
  const [displayColumns, setDisplayColumns] = useState<
    Record<DisplayUserKey, boolean>
  >({} as Record<DisplayUserKey, boolean>);

  // Initialize displayColumns with default values from userDisplayInfo
  useEffect(() => {
    const initialDisplayColumns: Record<DisplayUserKey, boolean> = {} as Record<
      DisplayUserKey,
      boolean
    >;
    sortedUserKeys.forEach((key) => {
      initialDisplayColumns[key] = userDisplayInfo[key].defaultDisplay;
    });
    setDisplayColumns(initialDisplayColumns);
  }, []);

  const generate = (): void => {
    setGenNum(0);
    setTimeout(() => {
      setGenNum(genNum);
    }, 0);
  };

  const users = createUsers(genNum, useNumro, mailDomain, idOffset);

  const downloadCsv = (): void => {
    downloadAsCsv(
      userToCsvText(users, idOffset, nameSeparator, displayColumns),
      "users"
    );
  };
  const title = "ダミーユーザー情報生成";
  const description =
    "テスト用のダミーユーザー情報を大量に生成・ダウンロードできます。セルをクリックすると、中の値がクリップボードにコピーされます。";

  return (
    <div className={style.page}>
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <span className={commonStyle.paramLabel}>表示カラム</span>
          <div className={style.columnCheckboxes}>
            {sortedUserKeys.map((key) => (
              <label key={key} className={style.columnCheckbox}>
                <input
                  type="checkbox"
                  checked={displayColumns[key] || false}
                  onChange={(e): void => {
                    setDisplayColumns({
                      ...displayColumns,
                      [key]: e.target.checked,
                    });
                  }}
                  className={commonStyle.checkbox}
                />
                {headerLabels[key] || key}
              </label>
            ))}
          </div>
        </div>
        <div className={commonStyle.paramContainer}>
          <span className={commonStyle.paramLabel}>ユーザーパラメータ</span>
          <div style={{ marginTop: "8px" }}>
            <ParamBox labelName="一条太郎方式">
              <input
                type="checkbox"
                defaultChecked={useNumro}
                onChange={(e): void => setUseNumro(e.target.checked)}
                className={commonStyle.checkbox}
              ></input>
            </ParamBox>
            <ParamBox labelName="メールのドメイン">
              <input
                type="text"
                defaultValue={mailDomain}
                onChange={(e): void => setMailDomain(e.target.value)}
              ></input>
            </ParamBox>
            <ParamBox labelName="名前用スペーサー">
              <input
                type="text"
                defaultValue={nameSeparator}
                onChange={(e): void => setNameSeparator(e.target.value)}
              ></input>
            </ParamBox>
          </div>
        </div>
        <div className={commonStyle.paramContainer}>
          <span className={commonStyle.paramLabel}>出力パラメータ</span>
          <div style={{ marginTop: "8px" }}>
            <ParamBox labelName="生成数">
              <input
                className={commonStyle.textRight}
                type="number"
                defaultValue={genNum}
                onChange={(e): void => setGenNum(parseInt(e.target.value))}
              ></input>
            </ParamBox>
            <ParamBox labelName="Offset">
              <input
                className={commonStyle.textRight}
                type="number"
                defaultValue={idOffset}
                onChange={(e): void => setIdOffset(parseInt(e.target.value))}
              ></input>
            </ParamBox>
            <button className={commonStyle.testaroButton} onClick={generate}>
              再生成
              <FontAwesomeIcon icon={faRedo} className={commonStyle.icon} />
            </button>
            <button
              className={commonStyle.testaroButton}
              onClick={downloadCsv}
              style={{ marginLeft: 5 }}
            >
              CSVダウンロード
              <FontAwesomeIcon
                icon={faFileDownload}
                className={commonStyle.icon}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={commonStyle.outputsContainer}
        style={{ display: "block" }}
      >
        <div className={commonStyle.outputContainer}>
          <UserTable
            users={users}
            idOffset={idOffset}
            nameSeparator={nameSeparator}
            displayColumns={displayColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default UserGenerator;
