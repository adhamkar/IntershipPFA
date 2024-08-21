package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.Tache;

import java.util.List;

public interface TacheService {
    List<Tache> getAllTasksByEtudiant(Long etudiantId);
    Tache addTask(Tache task);
    Tache updateTask(Tache task);
    void deleteTask(Long taskId);
    Tache getTaskById(Long taskId);
    Tache markTaskAsComplete(Long taskId);
}
