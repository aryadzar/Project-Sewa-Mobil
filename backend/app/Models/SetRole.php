<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SetRole extends Model
{
    use HasFactory;

    public $table = 'user_roles';
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

    public function role(){
        return $this->belongsTo(Role::class, 'id_role');
    }

    public function user(){
        return $this->belongsTo(User::class, 'id_user');
    }
}
