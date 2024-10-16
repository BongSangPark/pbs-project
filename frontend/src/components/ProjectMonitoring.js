import React, { useEffect, useRef, useState } from "react";
import ProjectMonitoringContents from "./ProjectMonitoringContents";
import Item from "../menu/Item";

const ProjectMonitoring = () => {
  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [monitor, setMonitor] = useState([]);
  const mntRef = useRef([]);
  const [pjtNo, setPjtNo] = useState("");
  const [companyNo, setCompanyNo] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth().toString().padStart(2, "0");
  const yyyymm = `${year}${month}`;

  const text = "Home > 프로젝트 모니터링";

  useEffect(() => {
    mntRef.current[0].value = yyyymm;
    projectList();
    companyList();
    mntRef.current[0].focus();
  }, []);

  const projectList = () => {
    let pjtUrl = "http://localhost/contract/projectList";

    fetch(pjtUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("프로젝트 List 데이터가 존재하지 않습니다.");
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

  const companyList = () => {
    let comurl = "http://localhost/contract/companyList";

    fetch(comurl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("BP사 List 데이터가 존재하지 않습니다.");
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

  const listCheck = () => {
    if (mntRef.current[0].value.length !== 6) {
      alert("검수기준월을 입력하세요.(6자리)");
      mntRef.current[0].focus();
      return "NO";
    }
    return "OK";
  };

  const monitorProjectList = () => {
    if (listCheck() === "OK") {
      setPjtNo("");
      setCompanyNo("");

      let likeRef1 = mntRef.current[0].value;
      let likeRef2 = mntRef.current[1].value;
      let likeRef3 = mntRef.current[2].value;

      let baseurl = "http://localhost/monitor/like";
      let listUrl =
        baseurl +
        "?signMonth=" +
        likeRef1 +
        "&pjtNo=" +
        likeRef2 +
        "&companyNo=" +
        likeRef3;

      fetch(listUrl)
        .then((Res) => {
          if (Res.status === 200) {
            return Res.json();
          } else if (Res.status === 204) {
            setMonitor("");
            alert("monitorProjectList 데이터가 존재하지 않습니다.\n검수기준월을 확인하세요!");
            mntRef.current[0].focus();
          }
        })
        .then((data) => {
          setMonitor(data);
          return true;
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const selectContent = (pjtNo, companyNo) => {
    setPjtNo("");
    setCompanyNo("");
    setPjtNo(pjtNo);
    setCompanyNo(companyNo);
    selectComponent(pjtNo, companyNo);
  };

  function selectComponent(pjtNo, companyNo) {
    return <ProjectMonitoringContents pjtNo={pjtNo} companyNo={companyNo} />;
  }

  return (
    <div className="container-fluid">
      <div><Item item={text} /></div>
      <hr />
      <div>
        <b class="text-center fs-6">검수기준월 :</b>
        &nbsp;
        <input
          type="text"
          maxLength="6"
          style={{ width: "80px", fontSize: "90%", textAlign: "center" }}
          ref={(el) => (mntRef.current[0] = el)}
        />
        &nbsp;&nbsp;&nbsp;
        <b class="text-center fs-6">프로젝트 :</b>
        &nbsp;
        <select
          name="pjtNo"
          ref={(el) => (mntRef.current[1] = el)}
          style={{ width: "250px" }}
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
        &nbsp;&nbsp;&nbsp;
        <b class="text-center fs-6">BP사 :</b>
        &nbsp;
        <select
          name="companyNo"
          ref={(el) => (mntRef.current[2] = el)}
          style={{ width: "200px" }}
          class="form-select-sm"
        >
          <option value="" defaultValue="BP사 선택">
            BP사 선택
          </option>
          {company &&
            company.map((item, key) => (
              <option key={item.companyNo} value={item.companyNo}>
                [ {item.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3")} ]{" "}
                {item.companyNm}
              </option>
            ))}
        </select>
        &nbsp;
        <button type="button" class="btn btn-primary btn-sm" onClick={monitorProjectList}>
          조회
        </button>
        &nbsp;
        <label style={{ fontSize: "12pt" }}>
          (자료조회 및 상세버튼을 클릭하여 Monitoring 상세내역을 확인하세요!)
        </label>
      </div>
      <hr />
      <table
        className="table table-sm"
        style={{ fontSize: "90%" }}
      >
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">프로젝트 No</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 명</th>
            <th className="bg-secondary-subtle scope-col">발주기관</th>
            <th className="bg-secondary-subtle scope-col">프로젝트시작일</th>
            <th className="bg-secondary-subtle scope-col">프로젝트종료일</th>
            <th className="bg-secondary-subtle scope-col">PM</th>
            <th className="bg-secondary-subtle scope-col">기간(개월)</th>
            <th className="bg-secondary-subtle scope-col">총 M/M</th>
            <th className="bg-secondary-subtle scope-col">수주금액</th>
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사</th>
          </tr>
        </thead>
        <tbody>
          {monitor &&
            monitor.map((monitor, key) => (
              <tr key={monitor.rowNum}>
                <td>
                  {monitor.pjtNo.replace(/(\d{6})(\d{3})/, "$1-$2")}
                  <label className="right-align">
                    <button type="button" class="btn btn-outline-primary btn-sm"
                      onClick={() => { selectContent(monitor.pjtNo, monitor.companyNo); }} >
                      상세
                    </button>
                  </label>
                </td>
                <td align="left">{monitor.pjtNm}</td>
                <td>{monitor.orderOrg}</td>
                <td>{monitor.startDt}</td>
                <td>{monitor.endDt}</td>
                <td>
                  {monitor.pm} {monitor.position}
                </td>
                <td>{monitor.term}</td>
                <td>{monitor.totMm}</td>
                <td align="right">{monitor.totAmt.toLocaleString("ko-KR")}</td>
                <td>
                  {monitor.companyNo.replace(
                    /(\d{3})(\d{2})(\d{5})/,
                    "$1-$2-$3"
                  )}
                </td>
                <td align="left">{monitor.companyNm}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <div>{pjtNo && companyNo && selectComponent(pjtNo, companyNo)}</div>
    </div>
  );
};

export default ProjectMonitoring;
