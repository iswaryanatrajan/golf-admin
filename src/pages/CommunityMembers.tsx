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
  const [visibleColumns, setVisibleColumns] = useState(events.map(() => true));
  const [eventColumnFilters, setEventColumnFilters] = useState(events.map(() => "all"));

  const toggleColumn = (index) => {
    const newState = [...visibleColumns];
    newState[index] = !newState[index];
    setVisibleColumns(newState);
  };

  const filteredUsers = users.filter((user) =>
    user.events.every((val, i) => {
      const filter = eventColumnFilters[i];
      return (
        filter === "all" || String(val) === filter
      );
    })
  );

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
              {events.map((event, index) => (
                !visibleColumns[index] && (
                  <th key={index} className="px-2 py-1 text-center">
                    <label className="flex flex-col items-center space-y-1 text-xs">
                      <span>{event}</span>
                      <input
                        type="checkbox"
                        checked={visibleColumns[index]}
                        onChange={() => toggleColumn(index)}
                        className="cursor-pointer"
                      />
                    </label>
                  </th>
                )
              ))}
            </tr>
          </thead>

          {/* Main Table Header */}
          <thead className="bg-[#5f6cb8] text-left dark:bg-meta-4 text-white">
            <tr>
              <th className="px-2 py-1">ID</th>
              <th className="px-2 py-1 whitespace-nowrap">表示名</th>
              <th className="px-2 py-1 whitespace-nowrap break-words">活動地域_海外</th>
              <th className="px-2 py-1 whitespace-nowrap break-words">平均スコア</th>
              <th className="px-2 py-1 whitespace-nowrap break-words">性別</th>
              <th className="px-2 py-1 whitespace-nowrap">メールアドレス</th>
              <th className="px-2 py-1 whitespace-nowrap">電話番号</th>
              <th className="px-2 py-1 whitespace-nowrap">フリガナ</th>
              <th className="px-2 py-1 whitespace-nowrap">活動地域</th>
              <th className="px-2 py-1 whitespace-nowrap">顔写真</th>
              <th className="px-2 py-1 whitespace-nowrap">名刺</th>
              <th className="px-2 py-1 whitespace-nowrap">お名前</th>
              {events.map((event, index) =>
                visibleColumns[index] && (
                  <th key={index} className="px-2 py-1 whitespace-normal break-words border-r">
                    <div className="flex flex-col items-center">
                      <label className="flex items-center space-x-1 text-xs mt-1">
                        <input
                          type="checkbox"
                          checked={visibleColumns[index]}
                          onChange={() => toggleColumn(index)}
                        />
                        <span>表示</span>
                      </label>
                      <div className="text-sm">{event}</div>
                      <button
                        onClick={() => {
                          const newFilters = [...eventColumnFilters];
                          newFilters[index] = eventColumnFilters[index] === "1" ? "all" : "1";
                          setEventColumnFilters(newFilters);
                        }}
                        className={`mt-1 text-xs px-2 py-0.5 rounded ${
                          eventColumnFilters[index] === "1"
                            ? "bg-green-400 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        🔁 {eventColumnFilters[index] === "1" ? "1" : "All"}
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
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.regionAbroad}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.avgScore}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.gender}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.email}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.phone}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.furigana}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.region}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.facePhoto}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.businessCard}</td>
                  <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.name}</td>
                  {user.events.map((value, index) => (
                    <td
                      key={index}
                      className={`px-2 py-1 border-b border-r border-[#eee] dark:border-strokedark text-center ${
                        visibleColumns[index] ? "" : "hidden"
                      }`}
                    >
                      {visibleColumns[index] ? value : ""}
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
