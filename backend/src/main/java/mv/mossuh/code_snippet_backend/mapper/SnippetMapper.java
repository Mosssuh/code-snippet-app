package mv.mossuh.code_snippet_backend.mapper;

import mv.mossuh.code_snippet_backend.dto.SnippetDTO;
import mv.mossuh.code_snippet_backend.dto.TagDTO;
import mv.mossuh.code_snippet_backend.entity.Snippet;
import mv.mossuh.code_snippet_backend.entity.Tag;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class SnippetMapper {

    public static Snippet toSnippet(SnippetDTO snippetDTO) {
        Set<Tag> tags = new HashSet<>();
        if (snippetDTO.getTags() != null && !snippetDTO.getTags().isEmpty()) {
            tags.addAll(snippetDTO.getTags().stream().map((tag) -> TagMapper.toTag(tag)).collect(Collectors.toSet()));
        }

        return new Snippet(
                snippetDTO.getId(),
                snippetDTO.getTitle(),
                snippetDTO.getCode(),
                snippetDTO.getLanguage(),
                snippetDTO.getCreatedAt(),
                snippetDTO.getUpdatedAt(),
                tags
        );
    }
    public static SnippetDTO toSnippetDTO(Snippet snippet) {
        Set<TagDTO> tags = new HashSet<>();
        if (snippet.getTags() != null && !snippet.getTags().isEmpty()) {
            tags.addAll(snippet.getTags().stream().map((tag) -> TagMapper.toTagDTO(tag)).collect(Collectors.toSet()));
        }

        return new SnippetDTO(
                snippet.getId(),
                snippet.getTitle(),
                snippet.getCode(),
                snippet.getLanguage(),
                snippet.getCreatedAt(),
                snippet.getUpdatedAt(),
                tags
        );
    }
}
