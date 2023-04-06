package mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageCandidateRequest {
    private Long id;
    private String picture;
}
