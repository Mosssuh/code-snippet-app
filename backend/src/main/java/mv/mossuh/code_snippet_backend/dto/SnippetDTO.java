package mv.mossuh.code_snippet_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mv.mossuh.code_snippet_backend.entity.Tag;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SnippetDTO {
    private Long id;
    private String title;
    private String code;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<TagDTO> tags;
}
