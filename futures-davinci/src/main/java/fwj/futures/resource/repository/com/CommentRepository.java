package fwj.futures.resource.repository.com;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fwj.futures.resource.entity.com.Comment;

@RepositoryRestResource(exported = false)
public interface CommentRepository extends JpaRepository<Comment, Integer> {

	// List<Comment>
	// findByRelativeTypeAndRelativeKeyOrderByCommitTimeDesc(String
	// relativeType, String relativeId);

	@Query("select o from Comment o where o.relativeType=:type and o.relativeKey=:key order by commitTime desc")
	List<Comment> findByTypeAndKey(@Param("type") Integer type, @Param("key") String key);

	@Query("select o from Comment o where o.relativeType=:type order by commitTime desc")
	List<Comment> findByType(@Param("type") Integer type);

}