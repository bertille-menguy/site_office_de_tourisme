package com.officetourisme.officetourisme.service;

import com.officetourisme.officetourisme.modele.Option;
import com.officetourisme.officetourisme.repository.OptionRepository;
import com.officetourisme.officetourisme.service.OptionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OptionServiceImpl implements OptionService {

    private final OptionRepository optionRepository;

    @Override
    public Option creer(Option option) {
        return optionRepository.save(option);
    }

    @Override
    public List<Option> lire() {
        return optionRepository.findAll();
    }

    @Override
    public Option modifier(Long id, Option option) {
        return optionRepository.findById(id)
                .map(o->{
                    o.setNom(option.getNom());
                    return optionRepository.save(o);
                }).orElseThrow(()->new RuntimeException("Option n'existe pas !"));
    }

    @Override
    public String supprimer(Long id) {
        optionRepository.deleteById(id);
        return "Option supprimée";
    }
}
