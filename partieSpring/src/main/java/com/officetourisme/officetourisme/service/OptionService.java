package com.officetourisme.officetourisme.service;
import com.officetourisme.officetourisme.modele.Option;
import java.util.List;

public interface OptionService {

    Option creer(Option option);

    List<Option> lire();

    Option modifier(Long id, Option option);

    String supprimer(Long id);

}
