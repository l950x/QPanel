<?php

namespace App\Controller;

use App\Form\MediaType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use MercurySeries\FlashyBundle\FlashyNotifier;

class MediaController extends AbstractController
{
    #[Route('/media', name: 'app_media')]
    public function index(Request $request, EntityManagerInterface $entityManager, User $user, FlashyNotifier $flashy): Response
    {
        // Assurez-vous que l'utilisateur est authentifié
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            $flashy->error('You need to be authenticated');
            return $this->redirectToRoute('app_login');
        }

        $user = $this->getUser();

        $formzff = $this->createForm(MediaType::class);
        $status = null;

        $formzff->handleRequest($request);

        if ($formzff->isSubmitted() && $formzff->isValid()) {
            $data = $formzff->getData();
            $media = $data['media'];
            $service = $data['services'];
            $link = $data['link'];
            $number = $data['number'];

            $mediaId = $this->getMediaId($media, $service);

            if ($mediaId !== null) {
                $api = new ZFFApi($entityManager);
                $order = $api->order([
                    'service' => $mediaId,
                    'link' => $link,
                    'quantity' => $number
                ]);
                $dateTime = new \DateTime();
                $date = $dateTime->format('d/m/Y');
                $hours = $dateTime->format('H:i:s');
                $ip = $_SERVER['REMOTE_ADDR'];
                $api->sendAlert("Media Request by: " . $user->getUsername() . "\nMedia: " . $media . "\nService: " . $service . "\nQuantity: " . $number . "\nDate: " . $date . "\nHours: " . $hours . "\nLink: " . $link . "\nIP: " . $ip, 0);
                $status = $api->status($order->order);
            } else {
                $flashy->error('Media id null');
                $this->redirectToRoute('app_media');
            }

            $flashy->success('Media successfully sent');
            $this->redirectToRoute('app_media');

        }

        return $this->render('media/index.html.twig', [
            'controller_name' => 'AdminZFFController',
            'formzff' => $formzff,
        ]);
    }

    private function getMediaId(string $media, string $service): ?int
    {
        switch ($media) {
            case 'Instagram':
                return $this->getInstagramMediaId($service);
            case 'Tiktok':
                return $this->getTiktokMediaId($service);
            case 'Youtube':
                return $this->getYoutubeMediaId($service);
            default:
                return null;
        }
    }

    private function getInstagramMediaId(string $service): ?int
    {
        switch ($service) {
            case 'Followers':
                return 3356;
            case 'Likes':
                return 9703;
            default:
                return null;
        }
    }

    private function getTiktokMediaId(string $service): ?int
    {
        switch ($service) {
            case 'Followers':
                return 9236;
            case 'Likes':
                return 9827;
            default:
                return null;
        }
    }

    private function getYoutubeMediaId(string $service): ?int
    {
        switch ($service) {
            case 'Subscribers':
                return 9914;
            case 'Views':
                return 9335;
            default:
                return null;
        }
    }
}
