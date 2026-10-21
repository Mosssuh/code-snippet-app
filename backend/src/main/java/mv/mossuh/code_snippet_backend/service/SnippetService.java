package mv.mossuh.code_snippet_backend.service;

import mv.mossuh.code_snippet_backend.dto.SnippetDTO;

import java.util.Set;

public interface SnippetService {
    SnippetDTO createSnippet(SnippetDTO snippetDTO);
    Set<SnippetDTO> getSnippets();
    SnippetDTO getSnippetById(Long id);
    void deleteSnippet(Long id);
    SnippetDTO updateSnippet(Long id, SnippetDTO snippetDTO);
    Set<SnippetDTO> searchSnippets(String search);
}
