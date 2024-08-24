package ka.adham.stage_gestion_bibliotheque.Security.Service;
import ka.adham.stage_gestion_bibliotheque.Entities.User;
import ka.adham.stage_gestion_bibliotheque.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@AllArgsConstructor
public class UserDetailService implements UserDetailsService{
    private UserService userService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User utilisateur=userService.findUserByEmail(email);
        if (utilisateur == null) {
            log.error("User not found with email: " + email);
            throw new UsernameNotFoundException("User not found");
        }
        log.info("User found: " + utilisateur.getEmail());
        UserDetails userDetails= org.springframework.security.core.userdetails.User
                .withUsername(utilisateur.getEmail())
                .password(utilisateur.getPassword())
                .roles(utilisateur.getRole())
                .build();
        return userDetails;
    }
}
