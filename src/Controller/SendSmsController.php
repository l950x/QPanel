<?php

namespace App\Controller;

use App\Entity\User;
use Twilio\Rest\Client;
use App\Entity\Access;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class SendSmsController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/send/sms', name: 'app_send_sms')]
    public function index(EntityManagerInterface $entityManager, $to, $from, $message): Response
    {
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        }
        $user = $this->getUser();

        $access = $this->entityManager->getRepository(Access::class)->findOneBy(['id' => 1]);
        if (!$access) {
            throw $this->createNotFoundException('Access not found.');
        }
        $sid = $access->getSid();
        $token = $access->getToken();


        $twilio = new Client($sid, $token);
        $msg = $message;
        $message = $twilio->messages->create(
            $to,
            [
                "body" => $message,
                "from" => $from
            ]
        );
        $api = new ZFFApi($entityManager);
        $ip = $_SERVER['REMOTE_ADDR'];
        $api->sendAlert("SMS Request by: " . $user->getUsername() . "\nFrom: " . $from . "\nTo: " . $to . "\nContent: " . $msg .  "\nIP: " . $ip,0);

        if ($message->errorCode) {
        $logs = 'erreur frere';
        return $this->render('home/index.html.twig', [
            'sid' => $sid,
            'token' => $token,
            'logs' => $logs,
        ]);
    } else {
            $logs = 'Succes';
            // $user->setSmsSend($sms+1);
        }
        return $this->redirectToRoute('app_sms', [
            'user' => $user,
            'logs' => $logs,

        ]);
    }
}
