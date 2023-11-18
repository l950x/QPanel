<?php

namespace App\Controller;

use App\Entity\Access;
use App\Form\SMSType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SmsController extends AbstractController
{
    #[Route('/sms', name: 'app_sms')]
    public function index(Request $request): Response
    {

        $user = $this->getUser();
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }
        $form = $this->createForm(SMSType::class);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();

            $to = $data['to'];
            $from = $data['from'];
            $messageText = $data["message"];
            return $this->redirectToRoute('app_send_sms', [
                'to' => $to,
                'from' => $from,
                'message' => $messageText,
            ]);
            
        }

        $sms = $user->getSmsSend();

        return $this->render('sms/index.html.twig', [
            'controller_name' => 'smsController',
            'user' => $user,
            'form' => $form,
            'sms' => $sms,
        ]);
    }
}
