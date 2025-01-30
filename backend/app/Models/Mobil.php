<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mobil extends Model
{
    use HasFactory;
    public $table = 'mobil';
    public $incrementing = false;

    // Set primary key type ke string
        protected $keyType = 'string';
    protected $guarded = ['id'];
    // Override boot function untuk men-generate UUID secara otomatis
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid(); // generate UUID
            }
        });
    }

    public function actor(){
        return $this->belongsTo(User::class, 'id_actor');
    }

    public function merk_mobil(){
        return $this->belongsTo(MerkMobil::class, 'id_brand');
    }

    public function category(){
        return $this->belongsTo(Category::class, 'id_kategori');
    }
}
