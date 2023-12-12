import React, { useState } from "react";

function App() {
  const KmOptions = [{ data: 1 }, { data: 1.7 }, { data: 2.5 }, { data: 3 }];
  const KyOptions = [
    { data: "Средне- и низкоскоростная передача" },
    { data: "скоростная передача" },
  ];
  const ZOptions1 = [{ data: 20 }, { data: 25 }, { data: 30 }];
  const [a, setA] = useState("");
  const [n1, setN1] = useState("");
  const [N, setN] = useState("");
  const [resT, setResT] = useState("");
  const [resZp, setResZp] = useState("");
  const [selectedKm, setSelectedKm] = useState(1);
  const [selectedKy, setSelectedKy] = useState(
    "Средне- и низкоскоростная передача"
  );
  const [selectedZ1, setSelectedZ1] = useState(20);
  const [z2, setZ2] = useState("");
  const [resAlpha, setResAlpha] = useState("");
  const [delAlpha, setDelAlpha] = useState("");
  const [change, setChange] = useState(false);

  const selectT = (t) => {
    if (t >= 12.7 && t <= 15.875) {
      if (Math.abs(t - 12.7) < Math.abs(t - 15.875)) return 12.7;
      else return 15.875;
    }
    if (t >= 15.875 && t <= 19.05) {
      if (Math.abs(t - 15.875) < Math.abs(t - 19.05)) return 15.875;
      else return 19.05;
    }
    if (t >= 19.05 && t <= 25.4) {
      if (Math.abs(t - 19.05) < Math.abs(t - 25.4)) return 19.05;
      else return 25.4;
    }
    if (t >= 25.4 && t <= 31.75) {
      if (Math.abs(t - 25.4) < Math.abs(t - 31.75)) return 25.4;
      else return 31.75;
    }
    if (t >= 31.75 && t <= 38.1) {
      if (Math.abs(t - 31.75) < Math.abs(t - 38.1)) return 31.75;
      else return 38.1;
    }
    if (t >= 38.1 && t <= 44.45) {
      if (Math.abs(t - 38.1) < Math.abs(t - 44.45)) return 38.1;
      else return 44.45;
    }
    if (t >= 44.45 && t <= 50.8) {
      if (Math.abs(t - 44.45) < Math.abs(t - 50.8)) return 44.45;
      else return 50.8;
    }
    if (t >= 50.8) {
      return 50.8;
    }
    if (t <= 12.7) {
      return 12.7;
    }
  };

  const handleCalculation = () => {
    setChange(true);
    if (selectedKy === "Средне- и низкоскоростная передача") {
      const ky = 10 * Math.cbrt(parseInt(n1) / 10);
      const t = 30.5 * Math.cbrt(parseFloat((N * ky) / (n1 * selectedKm)));
      const selectedT = selectT(t);
      setResT(selectedT);
      const zp1 = (2 * a) / selectedT;
      const zp2 = (Number(selectedZ1) + Number(z2)) / 2;
      const zp3 =
        ((z2 - selectedZ1) * (z2 - selectedZ1) * selectedT) / (40 * a);
      const zp = parseInt(zp1 + zp2 + zp3);
      setResZp(zp);
      const lambda =
        zp * selectedT - (selectedT * (Number(selectedZ1) + Number(z2))) / 2;
      console.log(lambda);
      const delta =
        ((Number(z2) - Number(selectedZ1)) * selectedT) / (2 * 3.14);
      console.log(delta);
      const alpha =
        (Number(lambda) +
          Math.sqrt(Number(lambda * lambda) - Number(8 * delta * delta))) /
        4;
      setResAlpha(alpha.toFixed(3));
      console.log(alpha);
      const fmin =
        ((11.4 * Math.sqrt(alpha * alpha * alpha)) / (0.1 * 10)) *
        Math.cos((70 * Math.PI) / 180);
      console.log("fmin" + " " + fmin);
      console.log("cos " + Math.cos((70 * Math.PI) / 180));
      const delalpha = (3 * fmin) / (10 * alpha);
      setDelAlpha(delalpha.toFixed(3));
    } else {
      const ky = 10 * Math.cbrt((parseInt(n1) / 10) * (parseInt(n1) / 10));
      const t = 30.5 * Math.cbrt(parseFloat((N * ky) / (n1 * selectedKm)));
      const selectedT = selectT(t);
      const zp1 = (2 * a) / selectedT;
      const zp2 = (Number(selectedZ1) + Number(z2)) / 2;
      const zp3 =
        ((z2 - selectedZ1) * (z2 - selectedZ1) * selectedT) / (40 * a);
      const zp = parseInt(zp1 + zp2 + zp3);
      const lambda =
        zp * selectedT - (selectedT * (Number(selectedZ1) + Number(z2))) / 2;
      console.log(lambda);
      const delta =
        ((Number(z2) - Number(selectedZ1)) * selectedT) / (2 * 3.14);
      console.log(delta);
      const alpha =
        (Number(lambda) +
          Math.sqrt(Number(lambda * lambda) - Number(8 * delta * delta))) /
        4;
      console.log("alpha" + " " + alpha);
      const fmin =
        ((11.4 * Math.sqrt(alpha * alpha * alpha)) / (0.1 * 10)) *
        Math.cos((70 * Math.PI) / 180);
      console.log("fmin" + " " + fmin);
      console.log("cos " + Math.cos((70 * Math.PI) / 180));
      //const delalpha = (Math.random() * 4 + 1).toFixed(3);
      const delalpha = (3 * fmin) / (10 * alpha);
      setResT(selectedT);
      setResZp(zp);
      setResAlpha(alpha.toFixed(3));
      setDelAlpha(delalpha.toFixed(3));
      console.log(change);
    }
  };

  return (
    <>
      <header className="header">
        <h1>Проектировочный расчет цепной передачи</h1>
      </header>
      <div className="wrapper">
        <div className="data">
          <input
            placeholder="Мощность N (кВт)"
            value={N}
            onChange={(e) => {
              setN(e.target.value);
              setChange(false);
            }}
          />
          <input
            placeholder="Частота вращения n1"
            value={n1}
            onChange={(e) => {
              setN1(e.target.value);
              setChange(false);
            }}
          />
          <input
            placeholder="Межосевое расстояние a'"
            value={a}
            onChange={(e) => {
              setA(e.target.value);
              setChange(false);
            }}
          />
          <div className="Km">
            <label>Выберите коэффициент, учитывающий число рядов цепи</label>
            <select
              value={selectedKm}
              onChange={(e) => {
                setSelectedKm(e.target.value);
                setChange(false);
              }}
            >
              {KmOptions.map((item, index) => (
                <option key={index} value={item.data}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div className="Ky">
            <label>
              Выберите тип цепной передачи для расчета коэффициента Ky(v)
            </label>
            <select
              value={selectedKy}
              onChange={(e) => {
                setSelectedKy(e.target.value);
                setChange(false);
              }}
            >
              {KyOptions.map((item, index) => (
                <option key={index} value={item.data}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div className="Ky">
            <label>Выберите число зубьев ведущей звёздочки (Z1)</label>
            <select
              value={selectedZ1}
              onChange={(e) => {
                {
                  setSelectedZ1(e.target.value);
                  setChange(false);
                }
              }}
            >
              {ZOptions1.map((item, index) => (
                <option key={index} value={item.data}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <input
            placeholder="z2"
            value={z2}
            onChange={(e) => {
              setZ2(e.target.value);
              setChange(false);
            }}
          />
        </div>
        <div className="data">
          <button onClick={handleCalculation}>Рассчитать</button>
          {change && <span>Шаг цепи (t): {resT}мм</span>}
          {change && <span>Число звеньев цепи (Zц): {resZp}</span>}
          {change && (
            <span>
              Межосевое расстояние (без учёта провисания): {resAlpha}мм
            </span>
          )}
          {change && <span>Провисание: {delAlpha}мм </span>}
          {change && (
            <span>
              Межосевое расстояние: {resAlpha} ± {delAlpha} мм
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
