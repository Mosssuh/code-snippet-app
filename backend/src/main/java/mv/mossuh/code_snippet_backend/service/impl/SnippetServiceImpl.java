package mv.mossuh.code_snippet_backend.service.impl;

import lombok.AllArgsConstructor;
import mv.mossuh.code_snippet_backend.dto.SnippetDTO;
import mv.mossuh.code_snippet_backend.entity.Snippet;
import mv.mossuh.code_snippet_backend.entity.Tag;
import mv.mossuh.code_snippet_backend.exception.ResourceNotFoundException;
import mv.mossuh.code_snippet_backend.mapper.SnippetMapper;
import mv.mossuh.code_snippet_backend.mapper.TagMapper;
import mv.mossuh.code_snippet_backend.repository.SnippetRepository;
import mv.mossuh.code_snippet_backend.service.SnippetService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SnippetServiceImpl implements SnippetService {

    private SnippetRepository snippetRepository;

    @Override
    public SnippetDTO createSnippet(SnippetDTO snippetDTO) {

        Snippet snippet = SnippetMapper.toSnippet(snippetDTO);
        snippet.setCreatedAt(LocalDateTime.now());
        snippet.setUpdatedAt(LocalDateTime.now());
        Snippet savedSnippet =  snippetRepository.save(snippet);

        return SnippetMapper.toSnippetDTO(savedSnippet);
    }

    @Override
    public Set<SnippetDTO> getSnippets() {
        return snippetRepository.findAll().stream().map((snippet) -> SnippetMapper.toSnippetDTO(snippet)).collect(Collectors.toSet());
    }

    @Override
    public SnippetDTO getSnippetById(Long id) {
        Snippet snippet = snippetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Snippet not found with id" + id));
        return SnippetMapper.toSnippetDTO(snippet);
    }

    @Override
    public void deleteSnippet(Long id) {
        Snippet snippet = snippetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Snippet not found with id" + id));
        snippetRepository.delete(snippet);
    }

    @Override
    public SnippetDTO updateSnippet(Long id, SnippetDTO snippetDTO) {
        Snippet snippet = snippetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Snippet not found with id" + id));
        Set<Tag> tags = new HashSet<>();
        if (snippetDTO.getTags() != null && !snippetDTO.getTags().isEmpty()) {
            tags.addAll(snippetDTO.getTags().stream().map((tag) -> TagMapper.toTag(tag)).collect(Collectors.toSet()));
        }

        snippet.setTitle(snippetDTO.getTitle());
        snippet.setCode(snippetDTO.getCode());
        snippet.setLanguage(snippetDTO.getLanguage());
        snippet.setUpdatedAt(LocalDateTime.now());
        snippet.setTags(tags);

        Snippet savedSnippet = snippetRepository.save(snippet);
        return SnippetMapper.toSnippetDTO(savedSnippet);
    }

    @Override
    public Set<SnippetDTO> searchSnippets(String search) {
        return snippetRepository.findAllByTitleContainingOrCodeContaining(search, search)
                .stream().map((snippet) -> SnippetMapper.toSnippetDTO(snippet)).collect(Collectors.toSet());
    }


}
