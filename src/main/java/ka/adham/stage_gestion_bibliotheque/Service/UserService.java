package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.User;

import java.util.List;

public interface UserService {
    User findUserByEmail(String email);
    void HashUserPassword(User user);
    List<User> findAllUsers();
}
