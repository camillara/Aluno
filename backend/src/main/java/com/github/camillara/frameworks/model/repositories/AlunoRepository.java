package com.github.camillara.frameworks.model.repositories;

import com.github.camillara.frameworks.model.Aluno;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AlunoRepository {
	private final String filePath = "documentos/aluno.db.json";
	private final ObjectMapper objectMapper = new ObjectMapper();

	public List<Aluno> findAll() throws IOException {
		File file = new File(filePath);
		if (!file.exists()) {
			return new ArrayList<>();
		}
		return objectMapper.readValue(file, new TypeReference<List<Aluno>>() {});
	}

	public void save(Aluno aluno) throws IOException {
		List<Aluno> alunos = findAll();
		alunos.add(aluno);
		objectMapper.writeValue(new File(filePath), alunos);
	}

	public List<Aluno> findByNameStartsWith(String namePrefix) throws IOException {
		List<Aluno> alunos = findAll();
		return alunos.stream()
				.filter(aluno -> aluno.getNome().toLowerCase().startsWith(namePrefix.toLowerCase()))
				.collect(Collectors.toList());
	}

}
