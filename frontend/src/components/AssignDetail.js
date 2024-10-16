import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const AssignDetail = () => {
  const param = useParams();
  const asnRef = useRef([]);
  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [contractPerson, setContractPerson] = useState();
  const navigate = useNavigate();
  const [assign, setAssign] = useState({
    asign_idx: "",
    pjtNo: "",
    pjtNm: "",
    companyNo: "",
    companyNm: "",
    assignMonth: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    assignMm: "",
  });

  const assign_idx = param.assign_idx;
  const assignMonth = param.assignMonth;
  const assignPjtNo = param.pjtNo;
  const assignCompanyNo = param.companyNo;

  const text = "Home > 인력투입 관리 > 실투입 상세";

  useEffect(() => {
    projectList();
    companyList(assignPjtNo);
    bpPersonList(assignPjtNo, assignCompanyNo);
    detailList();
  }, []);

  const projectList = () => {
    let url = "http://localhost/contract/projectList";

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setProject
        (data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const companyList = (assignPjtNo) => {
    let url = "http://localhost/contract/contractCompanyList/" + assignPjtNo;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setCompany("");
          alert("BP 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const bpPersonList = (pjtNo, assignCompanyNo) => {
    let url =
      "http://localhost/assign/assignBpPersonList/" +
      pjtNo +
      "/" +
      assignCompanyNo;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setContractPerson("");
          alert("bp인력 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setContractPerson(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const detailList = () => {
    let url = "http://localhost/assign/list/" + assign_idx + "/" + assignMonth;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setAssign(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleValueChange = (e) => {
    if (e.target.name === "pjtNo") {
      setContractPerson("");
      setAssign({
        ...assign,
        [e.target.name]: e.target.value,
        companyNo: "",
        companyNm: "",
        bpPerson: "",
        grade: "",
        birth: "",
        startDt: "",
        endDt: "",
        assignMm: "",
      });

      asnRef.current[1].value = "";
      asnRef.current[2].value = "";
      asnRef.current[3].value = "";
      asnRef.current[4].value = "";
      asnRef.current[5].value = "";
      asnRef.current[6].value = "";
      asnRef.current[7].value = "";

      if (e.target.value === "" || e.target.value === null) {
        setCompany("");
      } else {
        companyList(e.target.value);
      }
    } else if (e.target.name === "companyNo") {
      setAssign({
        ...assign,
        [e.target.name]: e.target.value,
        bpPerson: "",
        grade: "",
        birth: "",
        startDt: "",
        endDt: "",
        assignMm: "",
      });

      asnRef.current[2].value = "";
      asnRef.current[3].value = "";
      asnRef.current[4].value = "";
      asnRef.current[5].value = "";
      asnRef.current[6].value = "";
      asnRef.current[7].value = "";

      if (e.target.value === "" || e.target.value === null) {
        setContractPerson("");
      } else {
        bpPersonList(assign.pjtNo, e.target.value);
      }
    } else if (e.target.name === "bpPerson") {
      setAssign({
        ...assign,
        [e.target.name]: e.target.value,
        grade: "",
        birth: "",
        startDt: "",
        endDt: "",
        assignMm: "",
      });

      asnRef.current[3].value = "";
      asnRef.current[4].value = "";
      asnRef.current[5].value = "";
      asnRef.current[6].value = "";
      asnRef.current[7].value = "";

      if ((e.target.value !== "") && (e.target.value !== null)) {
        let str = e.target.value;
        let words = str.split(',');

        asnRef.current[3].value =  words[1];
        asnRef.current[7].value =  words[2];

        setAssign({
          ...assign,
          bpPerson: words[0],
          grade: words[1],
          birth: words[2],
        });

        asnRef.current[4].focus();
      }
    } else {
      setAssign({
        ...assign,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveCheck = () => {
    if (asnRef.current[0].value === "") {
      alert("프로젝트를 확인하세요.");
      asnRef.current[0].focus();
      return "NO";
    } else if (asnRef.current[1].value === "") {
      alert("BP사를 확인하세요.");
      asnRef.current[1].focus();
      return "NO";
    } else if (asnRef.current[2].value === "") {
      alert("투입인력을 확인하세요.");
      asnRef.current[2].focus();
      return "NO";
    } else if (asnRef.current[3].value === "") {
      alert("등급을 확인하세요.");
      asnRef.current[3].focus();
      return "NO";
    } else if (asnRef.current[4].value === "") {
      alert("투입 시작일을 확인하세요.");
      asnRef.current[4].focus();
      return "NO";
    } else if (asnRef.current[5].value === 0) {
      alert("투입 종료일을 확인하세요.");
      asnRef.current[5].focus();
      return "NO";
    } else if (asnRef.current[6].value === "") {
      alert("실투입 M/M를 확인하세요.");
      asnRef.current[6].focus();
      return "NO";
    } else if (asnRef.current[7].value === "") {
      alert("출생년도를 확인하세요.");
      asnRef.current[7].focus();
      return "NO";
    }
    return "OK";
  };

  const assignUpdate = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/assign/update";

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(assign),
      })
        .then((Res) => {
          if (Res.status === 200) {
            return Res.json();
          } else {
            alert("수정 문제가 발생했습니다.");
            throw Error("수정 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("수정 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const assignDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let url =
        "http://localhost/assign/delete/" +
        param.assign_idx +
        "/" +
        param.assignMonth;

      fetch(url, {
        method: "DELETE",
      })
        .then((Res) => {
          if (Res.status === 200) {
            return Res.json();
          } else {
            setAssign("");
            alert("삭제 문제가 발생했습니다.");
            throw Error("삭제 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("삭제 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });
      navigate("/assign/list");
    }
  };

  return (
    <div className="div">
      <div>
        <Item item={text} />
      </div>
      <hr />
      <table class="table table-bordered" style={{ fontSize: "90%" }}>
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              투입년월
            </th>
            <td valign="middle">{assign.assignMonth}</td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트
            </th>
            <td colSpan="5" align="left" className="input-Nm" valign="middle">
              <select
                name="pjtNo"
                value={assign.pjtNo}
                ref={(el) => (asnRef.current[0] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
                class="form-select-sm"
              >
                <option value="">
                  프로젝트 선택
                </option>
                {project &&
                  project.map((item, key) => (
                    <option key={item.pjtNo} value={item.pjtNo}>
                      [ {item.pjtNo.replace(/(\d{6})(\d{3})/, "$1-$2")} ]
                      {item.pjtNm}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              BP사
            </th>
            <td colSpan="3" align="left" className="input-Nm" valign="middle">
              <select
                name="companyNo"
                value={assign.companyNo}
                ref={(el) => (asnRef.current[1] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
                class="form-select-sm"
              >
                <option value="">
                  BP사 선택
                </option>
                {company &&
                  company.map((item, key) => (
                    <option key={item.pjtNo} value={item.companyNo}>
                      [{" "}
                      {item.companyNo.replace(
                        /(\d{3})(\d{2})(\d{5})/,
                        "$1-$2-$3"
                      )}{" "}
                      ] {item.companyNm}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              투입인력
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <select
                name="bpPerson"
                value={[assign.bpPerson,assign.grade,assign.birth]}
                ref={(el) => (asnRef.current[2] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                class="form-select-sm"
              >
                <option value="">
                  인력선택
                </option>
                {contractPerson &&
                  contractPerson.map((item, key) => (
                    <option key={item.rowNum} defaultValue={item.bpPerson} value={[item.bpPerson,item.grade,item.birth]}>
                      {item.bpPerson}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              등급
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="grade"
                value={assign.grade.substr(1)}
                ref={(el) => (asnRef.current[3] = el)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              투입시작일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="startDt"
                value={assign.startDt}
                maxLength="8"
                ref={(el) => (asnRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              투입종료일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="endDt"
                value={assign.endDt}
                maxLength="8"
                ref={(el) => (asnRef.current[5] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              실투입M/M
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="assignMm"
                value={assign.assignMm}
                maxLength="4"
                ref={(el) => (asnRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              출생년도
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="birth"
                value={assign.birth}
                maxLength={4}
                ref={(el) => (asnRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/assign/list">
        <button type="button" class="btn btn-primary btn-sm">
          투입 조회
        </button>
      </Link>
      &nbsp;
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={assignUpdate}
      >
        투입 수정
      </button>
      &nbsp;
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={assignDelete}
      >
        투입 삭제
      </button>
    </div>
  );
};

export default AssignDetail;
