package com.example.patientapi.patient;

import com.example.patientapi.error.ApiError;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import jakarta.validation.constraints.*;

@RestController
@RequestMapping("/api/v1/patients")
@Tag(name = "Patients", description = "Patient CRUD, pagination and name search")
@SecurityRequirement(name = "bearerAuth")
@ApiResponses({@ApiResponse(responseCode = "400", description = "Invalid request", content = @Content(schema = @Schema(implementation = ApiError.class))),
    @ApiResponse(responseCode = "401", description = "Missing or invalid token", content = @Content(schema = @Schema(implementation = ApiError.class))),
    @ApiResponse(responseCode = "403", description = "Insufficient permissions", content = @Content(schema = @Schema(implementation = ApiError.class)))})
public class PatientController {
    private final PatientService patients;

    public PatientController(PatientService patients) {
        this.patients = patients;
    }

    @PostMapping
    @Operation(summary = "Create a patient")
    @ApiResponses({@ApiResponse(responseCode = "201", description = "Created patient"), @ApiResponse(responseCode = "409", description = "Patient email already exists", content = @Content(schema = @Schema(implementation = ApiError.class)))})
    public ResponseEntity<PatientResponse> create(@Valid @RequestBody PatientRequest request) {
        PatientResponse patient = patients.create(request);
        return ResponseEntity.created(URI.create("/api/v1/patients/" + patient.id())).body(patient);
    }

    @GetMapping
    @Operation(summary = "List or search patients", description = "Case-insensitive name search. Zero-based page, size 1 to 100. Sort: id, name, email, phone, age or gender followed by asc or desc.")
    @ApiResponse(responseCode = "200", description = "Consistent page response")
    public ResponseEntity<PageResponse<PatientResponse>> list(
        @RequestParam(defaultValue = "") @Size(max = 100) String search,
        @RequestParam(defaultValue = "0") @Min(0) int page,
        @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size,
        @RequestParam(defaultValue = "name,asc") String sort) {
        return ResponseEntity.ok(patients.list(search, page, size, sort));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a patient by ID")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "Patient response"), @ApiResponse(responseCode = "404", description = "Patient not found", content = @Content(schema = @Schema(implementation = ApiError.class)))})
    public ResponseEntity<PatientResponse> get(@PathVariable @Min(1) Long id) {
        return ResponseEntity.ok(patients.get(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Replace all patient fields")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "Updated patient"), @ApiResponse(responseCode = "404", description = "Patient not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
        @ApiResponse(responseCode = "409", description = "Patient email already exists", content = @Content(schema = @Schema(implementation = ApiError.class)))})
    public ResponseEntity<PatientResponse> update(@PathVariable @Min(1) Long id, @Valid @RequestBody PatientRequest request) {
        return ResponseEntity.ok(patients.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a patient", description = "Requires ADMIN role")
    @ApiResponses({@ApiResponse(responseCode = "204", description = "Patient deleted", content = @Content), @ApiResponse(responseCode = "404", description = "Patient not found", content = @Content(schema = @Schema(implementation = ApiError.class)))})
    public ResponseEntity<Void> delete(@PathVariable @Min(1) Long id) {
        patients.delete(id);
        return ResponseEntity.noContent().build();
    }
}
