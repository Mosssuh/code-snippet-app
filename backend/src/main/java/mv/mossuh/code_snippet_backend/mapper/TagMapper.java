package mv.mossuh.code_snippet_backend.mapper;

import mv.mossuh.code_snippet_backend.dto.TagDTO;
import mv.mossuh.code_snippet_backend.entity.Tag;

public class TagMapper {

    public static Tag toTag(TagDTO tagDTO) {
        return new Tag(
                tagDTO.getId(),
                tagDTO.getName()
        );
    }

    public static TagDTO toTagDTO(Tag tag) {
        return new TagDTO(
                tag.getId(),
                tag.getName()
        );
    }
}
