package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.Tache;
import ka.adham.stage_gestion_bibliotheque.Repositories.TaskRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class TacheImpl implements TacheService {

    @Autowired private TaskRepo taskRepo;

    @Override
    public List<Tache> getAllTasksByEtudiant(Long etudiantId) {
        return taskRepo.findAllByEtudiantId(etudiantId);
    }

    @Override
    public Tache addTask(Tache task) {
        return taskRepo.save(task);
    }

    @Override
    public Tache updateTask(Tache task) {
        return taskRepo.save(task);
    }

    @Override
    public void deleteTask(Long taskId) {
        taskRepo.deleteById(taskId);
    }

    @Override
    public Tache getTaskById(Long taskId) {
        return taskRepo.findById(taskId).orElse(null)   ;
    }

    @Override
    public Tache markTaskAsComplete(Long taskId) {
        Tache task = taskRepo.findById(taskId).orElse(null);
        if(task != null){
            task.setCompleted(true);
            return taskRepo.save(task);
        }
        return null;
    }
}
