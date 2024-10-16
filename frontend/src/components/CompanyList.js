import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const CompanyList = () => {
  const [company, setCompany] = useState([]);
  const cmpRef = useRef();

  const text = "Home > BP사 관리 > BP사 조회";

  let url = "http://localhost/company/list";

  useEffect(() => {
    cmpRef.current.focus();
  }, []);

  const companyLikeList = () => {
    url = "http://localhost/company/like?companyNm=" + cmpRef.current.value;

    fetch(url, { method: "GET" })
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    cmpRef.current.focus();
  };

  return (
    <div className="container">
      <div><Item item={text} /></div>
      <hr />
      <b>BP사 명 :</b>
      &nbsp;
      <input
        type="text"
        style={{ fontSize: "90%" }}
        ref={cmpRef}
        placeholder="BP사 명을 입력하세요."
      ></input>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm"  onClick={companyLikeList}>
        조회
      </button>
      &nbsp;
      <label>(사업자 등록번호를 클릭하여 상세내역을 확인하세요.)</label>
      <label className="right-align">
        <Link to="/company/save">
          <button type="button" class="btn btn-primary btn-sm" >
            BP사 등록
          </button>
        </Link>
      </label>
      <hr />
      <table className="table" style={{ fontSize: "90%" }}>
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">대표자</th>
            <th className="bg-secondary-subtle scope-col">주소</th>
          </tr>
        </thead>
        <tbody align="center">
          {company &&
            company.map((company, key) => (
              <tr key={company.companyNo}>
                <td>
                  <Link to={`/company/list/${company.companyNo}`} style={{ color: "blue"}}>
                    {company.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}
                  </Link>
                </td>
                <td align="left">{company.companyNm}</td>
                <td>{company.leader}</td>
                <td>{company.companyAddr}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
