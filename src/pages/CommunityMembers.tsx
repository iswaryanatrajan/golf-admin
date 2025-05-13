import React, { useState } from "react";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const events = [
  "【5/20】 TASKGOLF lab ゴルフラウンド@群馬県",
  "【6/1】 TASKGOLF lab ゴルフラウンド@岡山県",
  "【5/31】 TASKGOLF lab 懇親会@岡山県",
  "【5/24~25】宿泊希望",
  "【5/24~25】コンペのみ希望",
  "【5/24~25】能登島ゴルフアンドカントリークラブお申し込み",
  "【5/10】秋葉ゴルフクラブお申し込み",
  "【4/20】中部コンペのお申し込み",
  "【4/19】中部イベント懇親会お申し込み",
  "【4/4】TASKGOLF lab 懇親会@福岡県",
  "【4/5】TASKGOLF lab ゴルフコンペ@山口県"
];

const users = [
  {
    id: "183186375",
    displayName: "渡邊 巧",
    regionAbroad: "image",
    avgScore: "",
    gender: "",
    email: "",
    phone: "",
    furigana: "",
    region: "",
    facePhoto: "",
    businessCard: "",
    name: "",
    events: [0, 0, 0, 0,0,0,0,0,0,0,0],
  },
  {
    id: "183434871",
    displayName: "松下 佳高",
    regionAbroad: "image",
    avgScore: "90~100",
    gender: "男性",
    email: "mattyanyd5@yahoo.co.jp",
    phone: "9087503210",
    furigana: "マツシタ ヨシタカ",
    region: "近畿",
    facePhoto: "登録済み",
    businessCard: "",
    name: "松下 佳高",
    events: [0, 1, 1, 0,0,0,0,0,0,0,0],
  },
  {
    id: "183435700",
    displayName: "永尾 隆文",
    regionAbroad: "image",
    avgScore: "90~100",
    gender: "男性",
    email: "",
    phone: "",
    furigana: "",
    region: "",
    facePhoto: "",
    businessCard: "",
    name: "永尾 隆文",
    events: [0, 0, 0, 0,0,0,0,0,0,0,0],
  },
  {
    id: "183436000",
    displayName: "山下 武英",
    regionAbroad: "image",
    avgScore: "90~100",
    gender: "男性",
    email: "mayumo44@outlook.jp",
    phone: "9036006637",
    furigana: "ヤマシタタケヒデ",
    region: "近畿",
    facePhoto: "登録済み",
    businessCard: "登録済み",
    name: "山下 武英",
    events: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "183437750",
    displayName: "小澤 まさえ",
    regionAbroad: "image",
    avgScore: "",
    gender: "",
    email: "fwij4419＠outlook.com",
    phone: "9033518035",
    furigana: "オザワマサエ",
    region: "近畿",
    facePhoto: "",
    businessCard: "",
    name: "小澤 まさえ",
    events: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  },
  {
    id: "183438484",
    displayName: "高橋 英之",
    regionAbroad: "image",
    avgScore: "100~110",
    gender: "男性",
    email: "",
    phone: "",
    furigana: "",
    region: "中部",
    facePhoto: "登録済み",
    businessCard: "",
    name: "高橋 英之",
    events: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  },
];

const Table = () => {
  const [filterIndex, setFilterIndex] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    true, // ID (always visible)
    true, // Name (always visible)
    true, // 活動地域_海外
    true, // 平均スコア
    true, // 性別
    true, // メールアドレス
    true, // 電話番号
    true, // フリガナ
    true, // 活動地域
    true, // 顔写真
    true, // 名刺
    true, // お名前
    ...events.map(() => true), // Event columns
  ]);
  const [columnFilters, setColumnFilters] = useState([
    "", // ID (no filter)
    "", // Name (no filter)
    "", // 活動地域_海外
    "", // 平均スコア
    "", // 性別
    "", // メールアドレス
    "", // 電話番号
    "", // フリガナ
    "", // 活動地域
    "", // 顔写真
    "", // 名刺
    "", // お名前
    ...events.map(() => ""), // Event columns
  ]);
  const [nonEmptyFilters, setNonEmptyFilters] = useState([
    false, // ID (no filter)
    false, // Name (no filter)
    ...Array(10).fill(false), // Static columns
    ...events.map(() => false), // Event columns
  ]);
  const [eventColumnFilters, setEventColumnFilters] = useState(events.map(() => "all"));

  const toggleColumn = (index) => {

    if (index === 0 || index === 1) return;
    
    const newState = [...visibleColumns];
    newState[index] = !newState[index];
    setVisibleColumns(newState);
  };

  const filteredUsers = users.filter((user) => {
    // Check static columns
    const staticColumns = [
      user.regionAbroad,
      user.avgScore,
      user.gender,
      user.email,
      user.phone,
      user.furigana,
      user.region,
      user.facePhoto,
      user.businessCard,
      user.name,
    ];
  
    for (let i = 0; i < staticColumns.length; i++) {
       // Apply non-empty filter
       if (nonEmptyFilters[i + 2] && !staticColumns[i]) {
        return false;
      }
    }
  
    // Check event columns
    for (let i = 0; i < user.events.length; i++) {
      if (columnFilters[i + 12] && String(user.events[i]) !== columnFilters[i + 12]) {
        return false;
      }
    }
  
    return true;
  });

  return (
    <DefaultLayout>
    <Breadcrumb pageName="Members" />

    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
    <button className="text-white bg-primary p-2 rounded-md">Upload client data</button>
    <button className="text-white bg-primary p-2 rounded-md">Upload event joined history</button>
    <button className="text-white bg-primary p-2 rounded-md">Download page data</button>
    </div>
    <div className="p-4 space-y-6">
      <div className="overflow-x-auto rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-md">
        <table className="min-w-full text-sm">
          {/* Row for Hidden Columns */}
          <thead>
  <tr className="bg-gray-100 dark:bg-gray-800">
    {visibleColumns.map((isVisible, index) => {
      // Skip ID (index 0) and Name (index 1) since they are always visible
      if (index === 0 || index === 1) return null;

      // Display hidden columns with checkboxes
      if (!isVisible) {
        const columnName =
          index < 12
            ? [
                "活動地域_海外",
                "平均スコア",
                "性別",
                "メールアドレス",
                "電話番号",
                "フリガナ",
                "活動地域",
                "顔写真",
                "名刺",
                "お名前",
              ][index - 2]
            : events[index - 12]; // Event columns

        return (
          <th key={index} className="px-2 py-1 text-center">
            <label className="flex flex-col items-center space-y-1 text-xs">
              <span>{columnName}</span>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => toggleColumn(index)}
                className="cursor-pointer"
              />
            </label>
          </th>
        );
      }

      return null;
    })}
  </tr>
</thead>

          {/* Main Table Header */}
          <thead className="bg-[#5f6cb8] text-left dark:bg-meta-4 text-white">
            <tr>
              <th className="px-2 py-1">ID</th>
              <th className="px-2 py-1 whitespace-nowrap">表示名</th>
                {/* Other columns with checkboxes */}
    {[
      "活動地域_海外",
      "平均スコア",
      "性別",
      "メールアドレス",
      "電話番号",
      "フリガナ",
      "活動地域",
      "顔写真",
      "名刺",
      "お名前",
    ].map((columnName, index) => 
      visibleColumns[index + 2] && (
      <th key={index + 2} className="px-2 py-1 whitespace-nowrap break-words">
        <div className="flex flex-col items-center">
          <span>{columnName}</span>
          <label className="flex items-center space-x-1 text-xs mt-1">
            <input
              type="checkbox"
              checked={visibleColumns[index + 2]} // Adjust index for columns after Name
              onChange={() => toggleColumn(index + 2)}
            />
          </label>
         {/* Non-Empty Filter Toggle */}
         <button
          onClick={() => {
            const newFilters = [...nonEmptyFilters];
            newFilters[index + 2] = !nonEmptyFilters[index + 2];
            setNonEmptyFilters(newFilters);
          }}
          className={`mt-1 text-xs px-2 py-1 border rounded ${
            nonEmptyFilters[index + 2] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {nonEmptyFilters[index + 2] ? "非空" : "全て"}
        </button>
        </div>
      </th>
    ))}

              {events.map((event, index) =>
                visibleColumns[index + 12] && (
                  <th key={index + 12} className="px-2 py-1 whitespace-normal break-words border-r">
                    <div className="flex flex-col items-center">
                      <label className="flex items-center space-x-1 text-xs mt-1">
                        <input
                          type="checkbox"
                          checked={visibleColumns[index + 12]}
                          onChange={() => toggleColumn(index + 12)}
                        />
                      </label>
                      <div className="text-sm">{event}</div>
                       {/* Participation Filter toggle  */}

                       <button
          onClick={() => {
            const newFilters = [...columnFilters];
            newFilters[index + 12] = columnFilters[index + 12] === "1" ? "" : "1";
            setColumnFilters(newFilters);
          }}
          className={`mt-1 text-xs px-2 py-1 border rounded ${
            columnFilters[index + 12] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {columnFilters[index + 12] ? "参加" : "全て"}
        </button>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={12 + events.length}
                  className="text-center py-4 border-b border-[#eee] dark:border-strokedark"
                >
                  該当する参加者がいません。
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.id}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.displayName}</td>
 {/* Other columns */}
 {[
          user.regionAbroad,
          user.avgScore,
          user.gender,
          user.email,
          user.phone,
          user.furigana,
          user.region,
          user.facePhoto,
          user.businessCard,
          user.name,
        ].map((value, index) => (
          <td
            key={index + 2}
            className={`px-2 py-1 border-b border-[#eee] dark:border-strokedark ${
              visibleColumns[index + 2] ? "" : "hidden"
            }`}
          >
            {value}
          </td>
        ))}
                  {user.events.map((value, index) => (
                    <td
                      key={index +12}
                      className={`px-2 py-1 border-b border-r border-[#eee] dark:border-strokedark text-center ${
                        visibleColumns[index +12 ] ? "" : "hidden"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </DefaultLayout>
  );
};

export default Table;
