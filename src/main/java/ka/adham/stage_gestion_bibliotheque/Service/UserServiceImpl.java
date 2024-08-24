package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.User;
import ka.adham.stage_gestion_bibliotheque.Repositories.UserRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    @Autowired private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    @Override
    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public void HashUserPassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }
}
