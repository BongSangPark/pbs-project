package ucube.com.manage.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import ucube.com.manage.model.Contract;
import ucube.com.manage.model.ProjectInfo;

@Mapper
public interface ContractMapper {

  public List<ProjectInfo> listProject();

  public List<ProjectInfo> listCompany();

  public List<ProjectInfo> listContractCompany(String pjtNo);

  public List<Contract> listContract();

  public Optional<Contract> findById(String contract_idx);

  public List<Contract> listLikeContract(HashMap map);

  public int saveContract(Contract Contract);

  public int updateContract(Contract Contract);

  public int deleteContract(String contract_idx);
}
