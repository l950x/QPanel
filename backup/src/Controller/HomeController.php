<?php

namespace App\Controller;
use App\Entity\Access;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $user = $this->getUser();
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }


        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'user' => $user,
        ]);
    }
}
