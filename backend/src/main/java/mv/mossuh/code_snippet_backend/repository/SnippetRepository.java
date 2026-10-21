package mv.mossuh.code_snippet_backend.repository;

import mv.mossuh.code_snippet_backend.entity.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    Set<Snippet> findAllByTitleContainingOrCodeContaining(String title, String code);
    boolean existsByTagsId(Long tagId);
}
