package mv.mossuh.code_snippet_backend.service;

import mv.mossuh.code_snippet_backend.dto.TagDTO;

import java.util.Set;

public interface TagService {
    TagDTO createTag(TagDTO tag);
    TagDTO updateTag(Long id, TagDTO tagDTO);
    boolean deleteTag(Long id);
    Set<TagDTO> searchTags(String search);

    Set<TagDTO> getTags();
}
