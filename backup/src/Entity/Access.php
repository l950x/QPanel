<?php

namespace App\Entity;

use App\Repository\AccessRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AccessRepository::class)]
class Access
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $sid = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSid(): ?string
    {
        return $this->sid;
    }

    public function setSid(string $sid): static
    {
        $this->sid = $sid;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }
}
