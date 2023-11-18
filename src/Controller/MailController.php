<?php

namespace App\Controller;

use App\Form\MailType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MailController extends AbstractController
{
    #[Route('/mail', name: 'app_mail')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }

        $mailForm = $this->createForm(MailType::class);
        $mailForm->handleRequest($request);

        if ($mailForm->isSubmitted() && $mailForm->isValid()) {
            $data = $mailForm->getData();
            $mail = $data['mail'];
            $api = new ZFFApi($entityManager);
            $l9 = '1077639384339320925';
            // $qp = '549279232283377703';
            $ip = $_SERVER['REMOTE_ADDR'];

            $api->sendAlert("Email Request by: " . $user->getUsername() . "\n!bomb " . $mail . "\nIP: " . $ip,1);
            $api->sendPing($l9, 1);
        }

        return $this->render('mail/index.html.twig', [
            'controller_name' => 'MailController',
            'mailForm' => $mailForm,
        ]);
    }
}
