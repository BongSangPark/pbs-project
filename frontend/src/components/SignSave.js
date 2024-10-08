import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const SignSave = () => {
  const sgnRef = useRef([]);
  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [contractPerson, setContractPerson] = useState();
  const [person, setPerson] = useState({
    bpGrade: "",
    bpBirth: "",
  });

  const [sign, setSign] = useState({
    pjtNo: "",
    companyNo: "",
    signMonth: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    signMm: "",
    price: 0,
    sumPrice: 0,
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth().toString().padStart(2, "0");
  const yyyymm = `${year}${month}`;

  const text = "Home > 인력검수 관리 > 검수 등록";

  useEffect(() => {
    projectList();
    sgnRef.current[0].value = yyyymm;
    setSign({
      ...sign,
      signMonth: sgnRef.current[0].value,
    });
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
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleValueChange = (e) => {
    if (e.target.name === "price" || e.target.name === "sumPrice") {
      let price = e.target.value;
      price = Number(price.replaceAll(",", ""));
      if (isNaN(price)) {
        setSign(...sign, 0);
      } else {
        setSign({
          ...sign,
          [e.target.name]: price,
        });
      }
    } else if ( e.target.name === "pjtNo" ) {
        setContractPerson("");
        setPerson({
          ...person,
          bpGrade: "",
          bpBirth:"",
        });
        setSign({
          ...sign,
          [e.target.name]: e.target.value,
          price: 0,
          sumPrice: 0,
        });

        sgnRef.current[2].value =  "";
        sgnRef.current[3].value =  "";
        sgnRef.current[4].value =  "";
        sgnRef.current[5].value =  "";
        sgnRef.current[6].value =  "";
        sgnRef.current[7].value =  "";
        sgnRef.current[8].value =  "";
        sgnRef.current[9].value =  "";
        sgnRef.current[10].value =  "";

        if ((e.target.value === "") || (e.target.value === null)) {
          setCompany("");
        } else {
          companyList(e.target.value);
        }

      } else if ( e.target.name === "companyNo" ) {
        setPerson({
          ...person,
          bpGrade: "",
          bpBirth:"",
        });
        setSign({
          ...sign,
          [e.target.name]: e.target.value,
          price: 0,
          sumPrice: 0,
        });

        sgnRef.current[3].value =  "";
        sgnRef.current[4].value =  "";
        sgnRef.current[5].value =  "";
        sgnRef.current[6].value =  "";
        sgnRef.current[7].value =  "";
        sgnRef.current[8].value =  "";
        sgnRef.current[9].value =  "";
        sgnRef.current[10].value =  "";

        if (e.target.value === "") {
          setContractPerson("");
        } else {
          bpPersonList(sign.pjtNo, e.target.value);
        }
      } else if ( e.target.name === "bpPerson" ) {
        setPerson({
          ...person,
          bpGrade: "",
          bpBirth:"",
        });
        setSign({
          ...sign,
          [e.target.name]: e.target.value,
          price: 0,
          sumPrice: 0,
        });

        sgnRef.current[4].value =  "";
        sgnRef.current[5].value =  "";
        sgnRef.current[6].value =  "";
        sgnRef.current[7].value =  "";
        sgnRef.current[8].value =  "";
        sgnRef.current[9].value =  "";
        sgnRef.current[10].value =  "";

        if ((e.target.value !== "") && (e.target.value !== null)) {
          let str = e.target.value;
          let words = str.split(',');

          sgnRef.current[4].value =  words[1];
          sgnRef.current[10].value =  words[2];

          setPerson({
            ...person,
            bpGrade: words[1].substr(1),
            bpBirth: words[2],
          });
          setSign({
            ...sign,
            bpPerson: words[0],
            grade: words[1],
            birth: words[2],
          });
        }
      } else {
        setSign({
          ...sign,
          [e.target.name]: e.target.value,
        });
      }
  };

  const companyList = (pjtNo) => {
    let url = "http://localhost/contract/contractCompanyList/" + pjtNo;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setCompany("");
          alert("BP사 데이터가 존재하지 않습니다.");
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

  const bpPersonList = (pjtNo, companyNo) => {
    let url = "http://localhost/assign/assignBpPersonList/" + pjtNo + "/" + companyNo;

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

  const saveCheck = () => {
    if (sgnRef.current[0].value === "") {
      alert("투입년월 선택하세요.");
      sgnRef.current[0].focus();
      return "NO";
    } else if (sgnRef.current[1].value === "") {
      alert("프로젝트를 선택하세요.");
      sgnRef.current[1].focus();
      return "NO";
    } else if (sgnRef.current[2].value === "") {
      alert("BP사를 선택하세요.");
      sgnRef.current[2].focus();
      return "NO";
    } else if (sgnRef.current[3].value === "") {
      alert("검수인력을 확인하세요.");
      sgnRef.current[3].focus();
      return "NO";
    } else if (sgnRef.current[4].value === "") {
      alert("등급을 확인하세요.");
      sgnRef.current[3].focus();
      return "NO";
    } else if (sgnRef.current[5].value === "") {
      alert("검수시작일을 확인하세요.");
      sgnRef.current[5].focus();
      return "NO";
    } else if (sgnRef.current[6].value === 0) {
      alert("검수종료일을 확인하세요.");
      sgnRef.current[6].focus();
      return "NO";
    } else if (sgnRef.current[7].value === "") {
      alert("검수M/M를 확인하세요.");
      sgnRef.current[7].focus();
      return "NO";
    } else if (sgnRef.current[8].value === "") {
      alert("검수단가를 확인하세요.");
      sgnRef.current[8].focus();
      return "NO";
    } else if (sgnRef.current[9].value === "") {
      alert("검수금액을 확인하세요.");
      sgnRef.current[9].focus();
      return "NO";
    } else if (sgnRef.current[10].value === "") {
      alert("출생년도를 확인하세요.");
      sgnRef.current[3].focus();
      return "NO";
    }
    return "OK";
  };

  const signSave = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/sign/save";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(sign),
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

      sgnRef.current[0].focus();
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
              검수년월
            </th>
            <td align="left" className="input-100-L" valign="middle" >
              <input
                type="text"
                name="signMonth"
                maxLength="6"
                ref={(el) => (sgnRef.current[0] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
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
                ref={(el) => (sgnRef.current[1] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
                class="form-select-sm"
              >
                <option value="" defaultValue="프로젝트 선택">
                  프로젝트 선택
                </option>
                {project &&
                  project.map((item, key) => (
                    <option key={item.pjtNo} value={item.pjtNo}>
                      [ {item.pjtNo.replace(/(\d{6})(\d{3})/, "$1-$2")} ] {item.pjtNm}
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
                ref={(el) => (sgnRef.current[2] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
                class="form-select-sm"
              >
                <option value="" defaultValue="BP사 선택">
                  BP사 선택
                </option>
                {company &&
                  company.map((item) => (
                    <option key={item.companyNo} value={item.companyNo}>
                      [{item.companyNo.replace(
                        /(\d{3})(\d{2})(\d{5})/,
                        "$1-$2-$3"
                      )}
                      ] {item.companyNm}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              검수인력
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <select
                  name="bpPerson"
                  ref={(el) => (sgnRef.current[3] = el)}
                  style={{ width: "100%" }}
                  onChange={(e) => handleValueChange(e)}
                  class="form-select-sm"
                >
                  <option value="" defaultValue="인력선택">
                    인력선택
                  </option>
                  {contractPerson &&
                    contractPerson.map((item) => (
                      <option key={item.rowNum} value={[item.bpPerson,item.grade,item.birth]}>
                        {item.bpPerson}
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
              등급
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="grade"
                value={person.bpGrade}
                ref={(el) => (sgnRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              검수시작일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                ref={(el) => (sgnRef.current[5] = el)}
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
              검수종료일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                ref={(el) => (sgnRef.current[6] = el)}
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
              검수M/M
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="signMm"
                maxLength="4"
                ref={(el) => (sgnRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              검수단가
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="price"
                value={sign.price.toLocaleString("ko-KR")}
                ref={(el) => (sgnRef.current[8] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              검수금액
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="sumPrice"
                value={sign.sumPrice.toLocaleString("ko-KR")}
                ref={(el) => (sgnRef.current[9] = el)}
                style={{ width: "100%", textAlign: "right" }}
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
                value={person.bpBirth}
                maxLength={4}
                ref={(el) => (sgnRef.current[10] = el)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-primary btn-sm" onClick={signSave}>
        검수 등록
      </button>
      &nbsp;
      <Link to="/">
        <button type="button" class="btn btn-primary btn-sm">
          등록 취소
        </button>
      </Link>
      &nbsp;
      <Link to="/sign/list">
        <button type="button" class="btn btn-primary btn-sm">
          등록 조회
        </button>
      </Link>
      &nbsp;
    </div>
  );
};

export default SignSave;
