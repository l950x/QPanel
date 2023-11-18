<?php

namespace App\Controller;

use App\Form\User1Type;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface; // Importez le namespace

class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Assurez-vous que l'utilisateur est authentifié
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_login');
        }

        $user = $this->getUser();

        // Créez le formulaire en utilisant le formulaire User1Type
        $form = $this->createForm(User1Type::class, $user);

        // Gérez la soumission du formulaire
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Mettez à jour les données de l'utilisateur en base de données
            $entityManager->persist($user);
            $entityManager->flush();

            // Redirigez vers la page de profil après la mise à jour réussie
            return $this->redirectToRoute('app_profile');
        }

        // Si le formulaire a été soumis mais n'est pas valide, les erreurs seront automatiquement disponibles ici.

        return $this->render('profile/index.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }
}
