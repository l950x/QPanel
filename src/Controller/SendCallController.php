<?php

namespace App\Controller;

use Twilio\Rest\Client;
use App\Entity\Access;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class SendCallController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/send/sms', name: 'app_send_sms')]
    public function index(): Response
    {
        if (!$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
            $this->redirectToRoute('app_login');
        } 
        
        $access = $this->entityManager->getRepository(Access::class)->findOneBy([]);

        if (!$access) {
            throw $this->createNotFoundException('Access not found.');
        }

        $user = $this->getUser();

        $sid = $access->getSid();
        $token = $access->getToken();

        $to = $_POST["To"];
        $from = $_POST["From"];
        $messageText = $_POST["Message"];

        $twilio = new Client($sid, $token);

        $message = $twilio->messages->create(
            $to,
            [
                "body" => $messageText,
                "from" => $from
            ]
        );

        if ($message->errorCode) {
            return $this->render('home/index.html.twig', [
                // 'status' => $message->status,
                // 'error' => $message->errorCode,
                'sid' => $sid,
                'token' => $token,
            ]);
        } else {
            // $user->setSmsSend($sms+1);
        }

        return $this->render('sms/index.html.twig', [
            'user' => $user,
        ]);
    }
}
