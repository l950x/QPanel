<?php

namespace App\Controller;

use GuzzleHttp\Psr7\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CallController extends AbstractController
{
    #[Route('/call', name: 'app_call')]
    public function index(): Response
    {
        $user = $this->getUser();
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }

        // $sms = $user->getSmsSend();

        return $this->render('call/index.html.twig', [
            'controller_name' => 'smsController',
            'user' => $user,
            // 'sms' => $sms,
        ]);
    }

#[Route('/upload-mp3', name: 'app_upload_mp3')]
public function uploadMp3(Request $request): Response
{
    // Récupérer le fichier MP3 envoyé par le formulaire
    $mp3File = $request->files->get('mp3_file');

    // Vérifier si un fichier a été téléchargé
    if ($mp3File instanceof UploadedFile) {
        // Générez un nom de fichier unique pour éviter les conflits
        $newFileName = uniqid().'.'.$mp3File->guessExtension();

        // Déplacez le fichier téléchargé vers le répertoire de destination
        try {
            $mp3File->move(
                $this->getParameter('mp3_directory'), // Répertoire de destination (défini dans services.yaml)
                $newFileName
            );
        } catch (FileException $e) {
            // Gérer les erreurs de déplacement du fichier
            // Par exemple, vous pouvez enregistrer l'erreur dans un journal
        }

        // Vous pouvez maintenant utiliser $newFileName pour enregistrer le fichier MP3 dans votre base de données ou faire d'autres traitements
    }

    // Redirigez l'utilisateur vers la page d'origine ou affichez un message de succès
    // ...

    return $this->redirectToRoute('app_call'); // Redirection vers la page call
}

}
