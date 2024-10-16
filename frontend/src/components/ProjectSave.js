import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const ProjectSave = () => {
  const pjtRef = useRef([]);
  const navigate = useNavigate();
  const [project, setProject] = useState({
    pjtNo: "",
    pjtNm: "",
    orderOrg: "",
    pm: "",
    startDt: "",
    endDt: "",
    term: "",
    totAmt: 0,
    totMm: 0,
  });

  const text = "Home > 프로젝트 관리 > 프로젝트 등록";

  useEffect(() => {
    pjtRef.current[0].focus();
  }, []);

  const
  handleValueChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const saveCheck = () => {
    if (pjtRef.current[0].value === "") {
      alert("프로젝트 NO를 확인하세요.");
      pjtRef.current[0].focus();
      return "NO";
    } else if (pjtRef.current[1].value === "") {
      alert("프로젝트 명를 확인하세요.");
      pjtRef.current[1].focus();
      return "NO";
    } else if (pjtRef.current[2].value === "") {
      alert("발주기관을 확인하세요.");
      pjtRef.current[2].focus();
      return "NO";
    } else if (pjtRef.current[3].value === "") {
      alert("PM을 확인하세요.");
      pjtRef.current[3].focus();
      return "NO";
    } else if (pjtRef.current[4].value === "") {
      alert("직급을 확인하세요.");
      pjtRef.current[4].focus();
      return "NO";
    } else if (pjtRef.current[5].value === "") {
      alert("수주금액을 확인하세요.");
      pjtRef.current[5].focus();
      return "NO";
    } else if (pjtRef.current[6].value === "") {
      alert("프로젝트 시작일을 확인하세요.");
      pjtRef.current[6].focus();
      return "NO";
    } else if (pjtRef.current[7].value === 0) {
      alert("프로젝트 종료일을 확인하세요.");
      pjtRef.current[7].focus();
      return "NO";
    } else if (pjtRef.current[8].value === "") {
      alert("기간(개월)을 확인하세요.");
      pjtRef.current[8].focus();
      return "NO";
    } else if (pjtRef.current[9].value === 0) {
      alert("총 M/M를 확인하세요.");
      pjtRef.current[9].focus();
      return "NO";
    }
    return "OK";
  };

  const projectSave = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/project/save";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(project),
      })
        .then((Res) => {
          if (Res.status === 201) {
            return Res.json();
          } else {
            alert("등록 문제가 발생했습니다.");
            throw Error("등록 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("등록 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });
      // pjtRef.current[0].focus();
      navigate("/project/list");
    }
  };

  return (
    <div className="div">
      <div>
        <Item item={text} />
      </div>
      <hr />
      <label
        style={{ position: "relative", top: "-15px", fontSize: "90%" }}
        className="right-align"
      >
        단위 : 원
      </label>
      <table class="table table-bordered" style={{ fontSize: "90%" }}>
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 No
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="pjtNo"
                maxLength="9"
                ref={(el) => (pjtRef.current[0] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="yyyymm001"
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 명
            </th>
            <td align="left" className="input-Nm" valign="middle">
              <input
                type="text"
                name="pjtNm"
                style={{ width: "100%" }}
                ref={(el) => (pjtRef.current[1] = el)}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              수주금액(원)
            </th>
            <td align="left" className="input-120-L" valign="middle">
              <input
                type="text"
                name="totAmt"
                ref={(el) => (pjtRef.current[5] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              시작일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                ref={(el) => (pjtRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="yyyymmdd"
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              종료일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                ref={(el) => (pjtRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="yyyymmdd"
              />
            </td>
          </tr>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              PM
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="pm"
                ref={(el) => (pjtRef.current[3] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              발주기관
            </th>
            <td align="left" className="input-Nm" valign="middle">
              <input
                type="text"
                name="orderOrg"
                ref={(el) => (pjtRef.current[2] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              PM 직급
            </th>
            <td align="left" className="input-120-L" valign="middle">
              <input
                type="text"
                name="position"
                ref={(el) => (pjtRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              기간(개월)
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="term"
                maxLength="3"
                ref={(el) => (pjtRef.current[8] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              총 M/M
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="totMm"
                maxLength="4"
                ref={(el) => (pjtRef.current[9] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-primary btn-sm" onClick={projectSave}>
        프로젝트 등록
      </button>
      &nbsp;
      <Link to="/">
        <button type="button" class="btn btn-primary btn-sm">
          프로젝트 취소
        </button>
      </Link>
      &nbsp;
      <Link to="/project/list">
        <button type="button" class="btn btn-primary btn-sm">
          프로젝트 조회
        </button>
      </Link>
      &nbsp;
    </div>
  );
};

export default ProjectSave;
