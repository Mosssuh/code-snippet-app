package mv.mossuh.code_snippet_backend.service.impl;

import lombok.AllArgsConstructor;
import mv.mossuh.code_snippet_backend.dto.TagDTO;
import mv.mossuh.code_snippet_backend.entity.Tag;
import mv.mossuh.code_snippet_backend.exception.ResourceAlreadyExistsException;
import mv.mossuh.code_snippet_backend.exception.ResourceNotFoundException;
import mv.mossuh.code_snippet_backend.mapper.TagMapper;
import mv.mossuh.code_snippet_backend.repository.SnippetRepository;
import mv.mossuh.code_snippet_backend.repository.TagRepository;
import mv.mossuh.code_snippet_backend.service.TagService;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TagServiceImpl implements TagService {
    private TagRepository tagRepository;
    private SnippetRepository snippetRepository;

    @Override
    public TagDTO createTag(TagDTO tagDTO) {
        String name = tagDTO.getName();
        if (tagRepository.existsByName(name)) {
            throw new ResourceAlreadyExistsException("Tag already created with name " + name);
        }

        Tag tag = TagMapper.toTag(tagDTO);
        Tag savedTag = tagRepository.save(tag);
        return TagMapper.toTagDTO(savedTag);
    }

    @Override
    public TagDTO updateTag(Long id, TagDTO tagDTO) {
        Tag tag = tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag not found with id " + id));

        tag.setName(tagDTO.getName());
        Tag savedTag = tagRepository.save(tag);
        return TagMapper.toTagDTO(savedTag);
    }

    @Override
    public boolean deleteTag(Long id) {
        Tag tag = tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag not found with id " + id));

        if (!snippetRepository.existsByTagsId(id)) {
            return false;
        }

        tagRepository.delete(tag);
        return true;
    }

    @Override
    public Set<TagDTO> searchTags(String search) {
        Set<Tag> tags = tagRepository.findAll().stream().filter((tag) -> tag.getName().contains(search)).collect(Collectors.toSet());
        return tags.stream().map((tag) -> TagMapper.toTagDTO(tag)).collect(Collectors.toSet());
    }

    @Override
    public Set<TagDTO> getTags() {
        return tagRepository.findAll().stream().map((tag) -> TagMapper.toTagDTO(tag)).collect(Collectors.toSet());
    }
}
