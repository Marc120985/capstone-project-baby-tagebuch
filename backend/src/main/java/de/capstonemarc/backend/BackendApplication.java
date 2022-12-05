package de.capstonemarc.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;

import de.capstonemarc.backend.pictures.PictureStorageService;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Resource
    PictureStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
//        storageService.deleteAll();
//        storageService.init();
    }

}
