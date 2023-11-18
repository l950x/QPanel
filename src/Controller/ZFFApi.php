<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Access;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class ZFFApi extends AbstractController
{
    private $api_url;
    private $api_key;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $access = $entityManager->getRepository(Access::class)->find(2);
        $this->api_url = $access->getSid();
        $this->api_key = $access->getToken();
    }

    public function order($data)
    {
        $post = array_merge(['key' => $this->api_key, 'action' => 'add'], $data);
        return json_decode($this->connect($post));
    }

    public function status($order_id)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'action' => 'status',
                'order' => $order_id
            ])
        );
    }

    public function multiStatus($order_ids)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'action' => 'status',
                'orders' => implode(",", (array)$order_ids)
            ])
        );
    }

    public function services()
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'action' => 'services',
            ])
        );
    }

    public function refill(int $orderId)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'order' => $orderId,
            ])
        );
    }

    public function multiRefill(array $orderIds)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'orders' => implode(',', $orderIds),
            ]),
            true,
        );
    }

    public function refillStatus(int $refillId)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'refill' => $refillId,
            ])
        );
    }

    public function multiRefillStatus(array $refillIds)
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'refills' => implode(',', $refillIds),
            ]),
            true,
        );
    }

    public function balance()
    {
        return json_decode(
            $this->connect([
                'key' => $this->api_key,
                'action' => 'balance',
            ])
        );
    }

    function sendAlert($content,$mod)
    {

        if (!$mod) {
            $webhook = 'https://discord.com/api/webhooks/1149771587382427750/eqSU6qd8JG1AtnKJP2e4cY9L_dQZC5Qlt9Gq9Y_nVl09BMZT1ehRak8g8wBOqf80SVHN';
        } else {
            $webhook = 'https://discord.com/api/webhooks/1151786174449455155/5sUR3cWvqts-Vk9EDIiRhtBkkAKZm6peUXZybzX4WK3guT8LmjjHqKuXJwXJa9-BfAz_';
        }

        $a = '```';

        $data = [
            'content' => $a . $content . $a,
            'username' => 'Automatized CABA',
            'avatar_url' => 'https://cdn.discordapp.com/attachments/391668902427361301/1150202328582987776/caba_meme_10v2.png',
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/json',
                'content' => json_encode($data),
            ],
        ];

        $context = stream_context_create($options);
        $result = file_get_contents($webhook, false, $context);

        return $result;
    }
    function sendPing($id, $mod)
    {

        if (!$mod) {
            $webhook = 'https://discord.com/api/webhooks/1149771587382427750/eqSU6qd8JG1AtnKJP2e4cY9L_dQZC5Qlt9Gq9Y_nVl09BMZT1ehRak8g8wBOqf80SVHN';
        } else {
            $webhook = 'https://discord.com/api/webhooks/1151786174449455155/5sUR3cWvqts-Vk9EDIiRhtBkkAKZm6peUXZybzX4WK3guT8LmjjHqKuXJwXJa9-BfAz_';
        }

        $data = [
            'content' => '<@' . $id . '>',
            'username' => 'Automatized CABA',
            'avatar_url' => 'https://cdn.discordapp.com/attachments/391668902427361301/1150202328582987776/caba_meme_10v2.png',
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/json',
                'content' => json_encode($data),
            ],
        ];

        $context = stream_context_create($options);
        $result = file_get_contents($webhook, false, $context);

        return $result;
    }

    // Utilisation de la fonction


    private function connect($post)
    {
        $_post = [];
        if (is_array($post)) {
            foreach ($post as $name => $value) {
                $_post[] = $name . '=' . urlencode($value);
            }
        }

        $ch = curl_init($this->api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        if (is_array($post)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, join('&', $_post));
        }
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)');
        $result = curl_exec($ch);
        if (curl_errno($ch) != 0 && empty($result)) {
            $result = false;
        }
        curl_close($ch);
        return $result;
    }
}

// Exemple d'utilisation :
// $api = new ZFFApi();
// $order = $api->order(['service' => 7154, 'link' => 'https://www.youtube.com/watch?v=EOFW0SRyS4Q', 'quantity' => 100, ]); # Default
// $status = $api->status($order->order); # Return status, charge, remains, start count, currency
// INSERT INTO `access` (`id`, `sid`, `token`) VALUES (NULL, 'https://smmfollows.com/api/v2', '7e873b41b34aec2be78cb3d8556395ec');