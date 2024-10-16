import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const SignList = () => {
  const [project, setProject] = useState();
  const [sign, setSign] = useState([]);
  const sgnRef = useRef([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()).toString().padStart(2, '0');
  const yyyymm = `${year}${month}`;

  const text = "Home > 인력검수 관리 > 검수 조회";

  useEffect(() => {
    sgnRef.current[0].value = yyyymm;
    projectList();
    sgnRef.current[0].focus();
  }, []);

  const projectList = () => {
    let pjtUrl = "http://localhost/contract/projectList";

    fetch(pjtUrl)
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

  const signLikeList = () => {
    let likeRef1 = sgnRef.current[0].value;
    let likeRef2 = sgnRef.current[1].value;
    let likeRef3 = sgnRef.current[2].value;
    let likeRef4 = sgnRef.current[3].value;

    let baseurl = "http://localhost/sign/like";
    let searchUrl = baseurl + "?signMonth=" + likeRef1 + "&pjtNo=" + likeRef2 + "&companyNm=" + likeRef3 + "&bpPerson=" + likeRef4;

    fetch(searchUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setSign("");
          alert("데이터가 존재하지 않습니다.\n검수년월을 확인하세요!");
          sgnRef.current[0].focus();
        }
      })
      .then((data) => {
        setSign(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
    sgnRef.current[0].focus();
  };

  return (
    <div className="container">
      <div><Item item={text} /></div>
      <hr />
      <b>검수년월 :</b>
      &nbsp;
      <input
        type="text"
        maxLength="6"
        style={{ width: "80px", fontSize: "90%", textAlign: "center" }}
        ref={(el) => (sgnRef.current[0] = el)}
      />
      &nbsp;
      <b>프로젝트 :</b>
      &nbsp;
      <select
        name="pjtNo"
        ref={(el) => (sgnRef.current[1] = el)}
        style={{ width: "200px" }}
        class="form-select-sm"
      >
        <option value="" defaultValue="프로젝트 선택">
          프로젝트 선택
        </option>
        {project &&
          project.map((item, key) => (
            <option key={item.pjtNo} value={item.pjtNo}>
              [ {item.pjtNo} ] {item.pjtNm}
            </option>
          ))}
      </select>
      &nbsp;
      <b>BP사 명 :</b>
      &nbsp;
      <input
        type="text"
        style={{ fontSize: "90%", textAlign: "left" }}
        ref={(el) => (sgnRef.current[2] = el)}
        placeholder="BP사 명을 입력하세요."
      ></input>
      &nbsp;
      <b>검수인력 :</b>
      &nbsp;
      <input
        type="text"
        style={{ width: "80px", fontSize: "90%", textAlign: "center" }}
        ref={(el) => (sgnRef.current[3] = el)}
        placeholder="투입인력을 입력하세요."
      ></input>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={signLikeList}>
        조회
      </button>
      &nbsp;
      <label style={{ fontSize: "10pt"}}>(프로젝트 NO를 클릭하여 상세내역을...)</label>
      <label className="right-align">
        <Link to="/sign/save">
          <button type="button" class="btn btn-primary btn-sm">
            검수 등록
          </button>
        </Link>
      </label>
      <hr />
      <table className="table" style={{ fontSize: "90%" }}>
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">검수년월</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 No</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 명</th>
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">검수인력</th>
            <th className="bg-secondary-subtle scope-col">등급</th>
          </tr>
        </thead>
        <tbody align="center">
          {sign &&
            sign.map((sign, key) => (
              <tr key={sign.sign_idx}>
                <td align="center">{sign.signMonth}</td>
                <td>
                  <Link to={`/sign/list/${sign.sign_idx}/${sign.signMonth}/${sign.pjtNo}/${sign.companyNo}`} style={{ color: "blue"}}>
                    {sign.pjtNo.replace(/(\d{6})(\d{3})/, '$1-$2')}
                  </Link>
                </td>
                <td align="left">{sign.pjtNm}</td>
                <td>{sign.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</td>
                <td align="left">{sign.companyNm}</td>
                <td>{sign.bpPerson}</td>
                <td>{sign.grade.substr(1)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignList;
