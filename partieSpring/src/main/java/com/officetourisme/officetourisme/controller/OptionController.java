package com.officetourisme.officetourisme.controller;

import com.officetourisme.officetourisme.modele.Option;
import com.officetourisme.officetourisme.service.OptionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/option")
@AllArgsConstructor
public class OptionController {

    private final OptionService optionService;

    @PostMapping("/create")
    public Option create(@RequestBody Option option){
        return optionService.creer(option);
    }

    @GetMapping("/read")
    public List<Option> read() {
        return optionService.lire();
    }

    @PutMapping("/update/{id}")
    public Option update(@PathVariable Long id, @RequestBody Option option){
        return optionService.modifier(id,option);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        return optionService.supprimer(id);
    }
}
