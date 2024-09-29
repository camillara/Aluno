package com.github.camillara.frameworks.rest.alunos;

import com.github.camillara.frameworks.model.Aluno;
import com.github.camillara.frameworks.model.repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

	@Autowired
	private AlunoRepository alunoRepository;

	@PostMapping("/cadastrar")
	public String cadastrarAluno(@RequestBody Aluno aluno) throws IOException {
		alunoRepository.save(aluno);
		return "Aluno cadastrado com sucesso!";
	}

	@GetMapping("/listar")
	public List<Aluno> listarAlunos() throws IOException {
		return alunoRepository.findAll();
	}

	@GetMapping("/buscar")
	public List<Aluno> buscarPorNome(@RequestParam String nome) throws IOException {
		return alunoRepository.findByNameStartsWith(nome);
	}
}
