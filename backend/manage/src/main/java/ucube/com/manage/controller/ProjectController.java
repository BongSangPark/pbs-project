package ucube.com.manage.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ucube.com.manage.model.Project;
import ucube.com.manage.service.ProjectService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

  private final ProjectService projectService;

  // 전체 조회
  @GetMapping("/list")
  public ResponseEntity<?> findAll() {
    // return new ResponseEntity<>(projectService.projectList(), HttpStatus.OK);
    try {
      List<Project> list = projectService.projectList();

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 한건 조회
  @GetMapping("/list/{pjtNo}")
  public ResponseEntity<?> findById(@PathVariable("pjtNo") String pjtNo) {
    Optional<Project> project = projectService.projectQuery(pjtNo);

    if (project.isPresent()) {
      return new ResponseEntity<>(project.get(), HttpStatus.OK);

    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // like 조회
  @GetMapping("/like")
  public ResponseEntity<?> findLikeNm(@RequestParam("pjtNm") String pjtNm) {
    try {
      List<Project> list = projectService.projectLikelist(pjtNm);

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 저장 하기
  @PostMapping("/save")
  public ResponseEntity<?> save(@RequestBody Project project) {
    try {
      return new ResponseEntity<>(projectService.projectSave(project), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 수정 하기
  @PutMapping("/update")
  public ResponseEntity<?> update(@RequestBody Project project) {
    try {
      return new ResponseEntity<>(projectService.projectUpdate(project), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 삭제 하기
  @DeleteMapping("/delete/{pjtNo}")
  public ResponseEntity<?> delete(@PathVariable("pjtNo") String pjtNo) {
    try {
      return new ResponseEntity<>(projectService.projectDelete(pjtNo), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
