"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [activeList, setActiveList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const getStatus = (ms) => {
    const min = ms / 1000 / 60;
    if (min >= 20) return "지연";
    if (min >= 10) return "주의";
    return "정상";
  };

  const startReception = () => {
    if (!input.trim()) {
      alert("고객명 또는 접수번호를 입력해주세요.");
      return;
    }

    const exists = activeList.some((item) => item.name === input.trim());
    if (exists) {
      alert("이미 진행 중인 접수입니다.");
      return;
    }

    setActiveList([
      ...activeList,
      {
        id: Date.now(),
        name: input.trim(),
        startTime: Date.now(),
      },
    ]);

    setInput("");
  };

  const finishReception = (id) => {
    const item = activeList.find((item) => item.id === id);
    const endTime = Date.now();

    setActiveList(activeList.filter((item) => item.id !== id));

    setDoneList([
      {
        ...item,
        endTime,
        totalTime: endTime - item.startTime,
      },
      ...doneList,
    ]);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>고객 접수 경과시간 관리</h1>

      <div style={{ marginBottom: 30 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="고객명 또는 접수번호 입력"
          style={{
            padding: 12,
            width: 300,
            border: "1px solid #ccc",
            borderRadius: 8,
            marginRight: 10,
          }}
        />
        <button onClick={startReception} style={{ padding: 12 }}>
          접수 시작
        </button>
      </div>

      <h2>진행 중 접수</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>고객/접수번호</th>
            <th>시작시간</th>
            <th>경과시간</th>
            <th>상태</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {activeList.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                진행 중인 접수가 없습니다.
              </td>
            </tr>
          ) : (
            activeList.map((item) => {
              const elapsed = now - item.startTime;
              const status = getStatus(elapsed);

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{new Date(item.startTime).toLocaleTimeString()}</td>
                  <td>{formatTime(elapsed)}</td>
                  <td>{status}</td>
                  <td>
                    <button onClick={() => finishReception(item.id)}>
                      처리 완료
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>완료 내역</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>고객/접수번호</th>
            <th>시작시간</th>
            <th>완료시간</th>
            <th>총 소요시간</th>
          </tr>
        </thead>
        <tbody>
          {doneList.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                완료된 접수가 없습니다.
              </td>
            </tr>
          ) : (
            doneList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{new Date(item.startTime).toLocaleTimeString()}</td>
                <td>{new Date(item.endTime).toLocaleTimeString()}</td>
                <td>{formatTime(item.totalTime)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
<button
  onClick={() => {
    if (window.ChannelIO) {
      window.ChannelIO("showMessenger");
    }
  }}
  style={{
    position: "fixed",
    right: 20,
    bottom: 20,
    padding: "14px 18px",
    borderRadius: "999px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  💬 상담하기
</button>
