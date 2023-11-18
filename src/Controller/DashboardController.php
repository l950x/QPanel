<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route('/', name: 'app_dashboard')]
    public function index(UserRepository $userRepository): Response
    {
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }

        $latestUser = $userRepository->findOneBy([], ['id' => 'DESC']);
        
        $user = $this->getUser();
        $mail = null;

        if ($user->isVerified()) {
            $mail = "Verified";
        } else {
            $mail = "Unverified";
        }

        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'user' => $user,
            'mail' => $mail,
            'latest_user' => $latestUser->getUsername(),
        ]);
    }
}
