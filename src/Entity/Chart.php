<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ChartRepository")
 */
class Chart
{

    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="insert title please")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull
     */
    private $dataFile;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\NotNull
     */
    private $startYear;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\NotNull
     */
    private $endYear;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDataFile(): ?string
    {
        return $this->dataFile;
    }

    public function setDataFile(?string $dataFile): self
    {
        $this->dataFile = $dataFile;

        return $this;
    }

    public function getStartYear(): ?string
    {
        return $this->startYear;
    }

    public function setStartYear(?string $startYear): self
    {
        $this->startYear = $startYear;

        return $this;
    }

    public function getEndYear(): ?int
    {
        return $this->endYear;
    }

    public function setEndYear(?int $endYear): self
    {
        $this->endYear = $endYear;

        return $this;
    }
}
