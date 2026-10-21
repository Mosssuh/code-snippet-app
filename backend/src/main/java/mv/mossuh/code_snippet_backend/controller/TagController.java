package mv.mossuh.code_snippet_backend.controller;

import lombok.AllArgsConstructor;
import mv.mossuh.code_snippet_backend.dto.TagDTO;
import mv.mossuh.code_snippet_backend.service.impl.TagServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tags")
@AllArgsConstructor
public class TagController {
    /*
    REST API
     */

    private TagServiceImpl tagService;

    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody TagDTO tagDTO) {
        TagDTO savedTag = tagService.createTag(tagDTO);
        return new ResponseEntity<>(savedTag, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTag(@PathVariable Long id) {
        if (!tagService.deleteTag(id)) {
            return new ResponseEntity<>("Tag is already in use by Snippet!", HttpStatus.NOT_ACCEPTABLE);
        }

        return ResponseEntity.ok("Tag deleted successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(@PathVariable Long id, @RequestBody TagDTO tagDTO) {
        TagDTO savedTag = tagService.updateTag(id, tagDTO);
        return ResponseEntity.ok(savedTag);
    }

    @GetMapping
    public ResponseEntity<Set<TagDTO>> getTags() {
        Set<TagDTO> tags = tagService.getTags();
        return ResponseEntity.ok(tags);
    }
}
