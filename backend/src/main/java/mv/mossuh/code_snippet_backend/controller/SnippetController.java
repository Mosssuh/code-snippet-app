package mv.mossuh.code_snippet_backend.controller;

import lombok.AllArgsConstructor;
import mv.mossuh.code_snippet_backend.dto.SnippetDTO;
import mv.mossuh.code_snippet_backend.service.SnippetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/snippets")
@AllArgsConstructor
public class SnippetController {
    /*
    REST API
     */

    private SnippetService snippetService;

    // Add Snippet
    @PostMapping
    public ResponseEntity<SnippetDTO> createSnippet(@RequestBody SnippetDTO snippetDTO) {
        SnippetDTO savedSnippet = snippetService.createSnippet(snippetDTO);

        return new ResponseEntity<>(savedSnippet, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Set<SnippetDTO>> getSnippets(@RequestParam(value = "search", required = false) String search) {
        if (search != null) {
            Set<SnippetDTO> snippets = snippetService.searchSnippets(search);
            return ResponseEntity.ok(snippets);
        }

        Set<SnippetDTO> snippets = snippetService.getSnippets();
        return ResponseEntity.ok(snippets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SnippetDTO> getSnippetById(@PathVariable Long id) {
        return ResponseEntity.ok(snippetService.getSnippetById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSnippet(@PathVariable Long id) {
        snippetService.deleteSnippet(id);
        return ResponseEntity.ok("Snippet deleted successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<SnippetDTO> updateSnippet(@PathVariable Long id, @RequestBody SnippetDTO snippetDTO) {
        SnippetDTO snippet = snippetService.updateSnippet(id, snippetDTO);
        return ResponseEntity.ok(snippet);
    }
}
